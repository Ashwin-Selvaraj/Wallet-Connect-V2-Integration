import React from 'react';
import './App.css';
import ConnectWallet from './components/ConnectWallet';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WalletConnect V2 Integration</h1>
        <p>Connect your wallet to get started</p>
      </header>
      <main className="App-main">
        <ConnectWallet />
      </main>
    </div>
  );
}

export default App;
