import React from 'react'
import { WalletProvider } from './components/WalletProvider'
import { WalletConnect } from './components/WalletConnect'

function App() {
  return (
    <WalletProvider>
      <div className="App">
        <WalletConnect />
      </div>
    </WalletProvider>
  )
}

export default App;
