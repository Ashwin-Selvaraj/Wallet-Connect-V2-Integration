import { useEffect, useState } from 'react'
import { useWalletClient } from 'wagmi'
import { BrowserProvider } from 'ethers'

export function useSigner() {
  const { data: walletClient } = useWalletClient()
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    const getSigner = async () => {
      if (walletClient) {
        try {
          const ethersProvider = new BrowserProvider(walletClient.transport, 'any')
          const ethersSigner = await ethersProvider.getSigner()
          
          setProvider(ethersProvider)
          setSigner(ethersSigner)
        } catch (error) {
          console.error('Error getting signer:', error)
          setSigner(null)
          setProvider(null)
        }
      } else {
        setSigner(null)
        setProvider(null)
      }
    }

    getSigner()
  }, [walletClient])

  return { signer, provider }
}

// 9. Usage example in any component:
/*
import { useSigner } from '../hooks/useSigner'
import { useAccount } from 'wagmi'

function MyComponent() {
  const { signer, provider } = useSigner()
  const { address, isConnected } = useAccount()

  const doSomethingWithSigner = async () => {
    if (!signer) return
    
    // Use signer for contract interactions
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const result = await contract.someMethod()
  }

  return (
    <div>
      {isConnected ? (
        <button onClick={doSomethingWithSigner}>
          Interact with Contract
        </button>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  )
} */