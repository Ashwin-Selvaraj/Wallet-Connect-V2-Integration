import React, { useState, useEffect } from 'react';
import { Core } from '@walletconnect/core';
import { WalletKit } from '@reown/walletkit';

const ConnectWallet = () => {
  const [walletKit, setWalletKit] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeWalletKit();
  }, []);

  const initializeWalletKit = async () => {
    try {
      console.log('Initializing WalletKit...');
      
      // Try with a test project ID first
      const projectId = '954f19ecde347bba3ace9c453bb92626';
      console.log('Using project ID:', projectId);
      
      const core = new Core({
        projectId: projectId
      });

      console.log('Core initialized successfully');

      const metadata = {
        name: 'WalletConnect Test App',
        description: 'A test application for WalletConnect V2',
        url: window.location.origin,
        icons: ['https://assets.reown.com/reown-profile-pic.png']
      };

      console.log('Initializing WalletKit with metadata:', metadata);

      const kit = await WalletKit.init({
        core,
        metadata
      });

      console.log('WalletKit initialized successfully:', kit);
      setWalletKit(kit);

      // Check for existing connections
      const accounts = await kit.getAccounts();
      console.log('Existing accounts:', accounts);
      
      if (accounts && accounts.length > 0) {
        console.log('Found existing connection, setting connected state');
        setIsConnected(true);
        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error('Failed to initialize WalletKit:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      setError(`Failed to initialize wallet connection: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      console.log('Attempting to connect wallet...');
      setError(null);
      setIsLoading(true);

      if (!walletKit) {
        throw new Error('WalletKit not initialized');
      }

      // Log available methods on walletKit
      console.log('Available methods on walletKit:', Object.getOwnPropertyNames(walletKit));
      console.log('walletKit methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(walletKit)));

      // Try different possible method names
      let accounts = null;
      
      if (typeof walletKit.connect === 'function') {
        console.log('Using walletKit.connect()...');
        accounts = await walletKit.connect();
      } else if (typeof walletKit.request === 'function') {
        console.log('Using walletKit.request()...');
        accounts = await walletKit.request();
      } else if (typeof walletKit.openModal === 'function') {
        console.log('Using walletKit.openModal()...');
        accounts = await walletKit.openModal();
      } else if (typeof walletKit.connectWallet === 'function') {
        console.log('Using walletKit.connectWallet()...');
        accounts = await walletKit.connectWallet();
      } else {
        // Try to find any method that might be for connecting
        const methods = Object.getOwnPropertyNames(walletKit).filter(name => 
          name.toLowerCase().includes('connect') || 
          name.toLowerCase().includes('request') || 
          name.toLowerCase().includes('open')
        );
        console.log('Potential connection methods:', methods);
        
        if (methods.length > 0) {
          console.log(`Trying method: ${methods[0]}`);
          accounts = await walletKit[methods[0]]();
        } else {
          throw new Error('No connection method found on WalletKit');
        }
      }
      
      console.log('Connect result:', accounts);
      
      if (accounts && accounts.length > 0) {
        console.log('Wallet connected successfully:', accounts[0]);
        setIsConnected(true);
        setAccount(accounts[0]);
      } else {
        console.log('No accounts returned from connect');
        setError('No wallet accounts found. Please try again.');
      }
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      
      // Provide more specific error messages
      let errorMessage = 'Failed to connect wallet. Please try again.';
      
      if (err.message.includes('User rejected') || err.message.includes('cancelled')) {
        errorMessage = 'Connection was cancelled by user.';
      } else if (err.message.includes('No wallet found') || err.message.includes('wallet not found')) {
        errorMessage = 'No wallet found. Please install a compatible wallet like MetaMask, Rainbow, or Trust Wallet.';
      } else if (err.message.includes('Network') || err.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (err.message.includes('projectId') || err.message.includes('Project ID')) {
        errorMessage = 'Invalid project configuration. Please check the project ID.';
      } else if (err.message.includes('timeout')) {
        errorMessage = 'Connection timed out. Please try again.';
      } else if (err.message.includes('not a function')) {
        errorMessage = 'WalletKit API error. Please check the library version and documentation.';
      } else if (err.message) {
        errorMessage = `Connection failed: ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      console.log('Disconnecting wallet...');
      if (walletKit) {
        await walletKit.disconnect();
        console.log('Wallet disconnected successfully');
        setIsConnected(false);
        setAccount(null);
      }
    } catch (err) {
      console.error('Failed to disconnect wallet:', err);
      setError('Failed to disconnect wallet');
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="connect-wallet">
        <div className="loading">
          <p>Initializing wallet connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="connect-wallet">
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {/* Debug section - remove in production */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        padding: '1rem', 
        marginBottom: '1rem', 
        borderRadius: '10px',
        fontSize: '0.9rem'
      }}>
        <h4>Debug Info:</h4>
        <p>WalletKit initialized: {walletKit ? 'Yes' : 'No'}</p>
        <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
        <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
        <p>Account: {account ? formatAddress(account.address) : 'None'}</p>
        <button 
          onClick={() => {
            console.log('Manual retry clicked');
            setError(null);
            initializeWalletKit();
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '0.5rem'
          }}
        >
          Retry Initialization
        </button>
      </div>

      {!isConnected ? (
        <div className="connect-section">
          <h2>Connect Your Wallet</h2>
          <p>Connect your wallet to start using the application</p>
          <button 
            className="connect-button"
            onClick={connectWallet}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div className="connected-section">
          <h2>Wallet Connected</h2>
          <div className="account-info">
            <p><strong>Account:</strong> {formatAddress(account?.address)}</p>
            <p><strong>Chain ID:</strong> {account?.chainId}</p>
          </div>
          <button 
            className="disconnect-button"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
