import { useEffect, useState } from 'react';
import './App.css';
import ConnectWalletButton from './ConnectWalletButton';

import { BrowserProvider, formatEther, Contract } from 'ethers';
import { useDisconnect, useAppKitNetwork, useAppKitProvider } from '@reown/appkit/react';
import contractABI from './contractABI';

function App() {
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);

  const { disconnect } = useDisconnect();
  const { walletProvider } = useAppKitProvider('eip155');
  const { network } = useAppKitNetwork();

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        if (walletProvider) {
          const ethersProvider = new BrowserProvider(walletProvider);
          const signer = await ethersProvider.getSigner();
          const userAddress = await signer.getAddress();
          const userBalance = await ethersProvider.getBalance(userAddress);
          const net = await ethersProvider.getNetwork();

          setSigner(signer);
          setAddress(userAddress);
          setBalance(formatEther(userBalance));
          setChainId(net.chainId);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWalletData();
  }, [walletProvider]);

  useEffect(() => {
    if (signer) {
      const _contract = new Contract("0x046F5898D00DB74014199b50153FcC2F0f818175", contractABI, signer);
  
      // Example: read from the contract
      const fetchData = async () => {
        try {
          const value = await _contract.merkleRoot(); // replace with your function
          console.log("Contract data:", value);
        } catch (err) {
          console.error("Contract read error:", err);
        }
      };
  
      fetchData();
    }
  }, [signer]);

  useEffect(() => {
    console.log('signer', signer, 'address', address, 'balance', balance, 'chainId', chainId);
  }, [signer, address, balance, chainId]);

  return (
    <div>
      <h1>Welcome to My dApp</h1>
      <h4>Ashwin</h4>
      <ConnectWalletButton />
      {address && <h4>Address: {address}</h4>}
      {balance && <h4>Balance: {balance} ETH</h4>}
      {chainId && <h4>Chain ID: {chainId}</h4>}
      {error && <h4 style={{ color: 'red' }}>Error: {error}</h4>}
    </div>
  );
}

export default App;
