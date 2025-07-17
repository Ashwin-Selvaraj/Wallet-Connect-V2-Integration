import React, { useEffect, useState } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { BrowserProvider } from 'ethers'
import { useWalletClient } from 'wagmi'

export function WalletConnect() {
  const { open } = useWeb3Modal()
  const { address, isConnecting, isDisconnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { signMessage } = useSignMessage()
  const { data: walletClient } = useWalletClient()
  
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)

  // Get signer when wallet is connected
  useEffect(() => {
    const getSigner = async () => {
      if (walletClient) {
        try {
          // Convert wagmi client to ethers provider and signer
          const ethersProvider = new BrowserProvider(walletClient.transport, 'any')
          const ethersSigner = await ethersProvider.getSigner()
          
          setProvider(ethersProvider)
          setSigner(ethersSigner)
        } catch (error) {
          console.error('Error getting signer:', error)
        }
      }
    }

    getSigner()
  }, [walletClient])

  // Example function to sign a message
  const handleSignMessage = async () => {
    if (!signer) return
    
    try {
      const message = "Hello from your dApp!"
      const signature = await signMessage({ message })
      console.log('Signature:', signature)
      alert(`Message signed: ${signature}`)
    } catch (error) {
      console.error('Error signing message:', error)
    }
  }

  // Example function to get balance
  const getBalance = async () => {
    if (!provider || !address) return
    
    try {
      const balance = await provider.getBalance(address)
      const balanceInEth = balance.toString()
      console.log('Balance:', balanceInEth)
      alert(`Balance: ${balanceInEth} wei`)
    } catch (error) {
      console.error('Error getting balance:', error)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>WalletConnect Integration</h2>
      
      {isDisconnected && (
        <div>
          <button 
            onClick={() => open()} 
            disabled={isConnecting}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      )}

      {address && (
        <div style={{ marginTop: '20px' }}>
          <h3>Wallet Connected!</h3>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Signer Available:</strong> {signer ? '✅ Yes' : '❌ No'}</p>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleSignMessage}
              disabled={!signer}
              style={{
                padding: '10px 20px',
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: signer ? 'pointer' : 'not-allowed',
                opacity: signer ? 1 : 0.5
              }}
            >
              Sign Message
            </button>
            
            <button 
              onClick={getBalance}
              disabled={!provider}
              style={{
                padding: '10px 20px',
                backgroundColor: '#8B5CF6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: provider ? 'pointer' : 'not-allowed',
                opacity: provider ? 1 : 0.5
              }}
            >
              Get Balance
            </button>
            
            <button 
              onClick={() => disconnect()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
