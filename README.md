# WalletConnect V2 Integration

This project demonstrates how to integrate WalletConnect V2 with React using the `@reown/walletkit` package.

## Features

- ✅ Wallet connection and disconnection
- ✅ Account information display
- ✅ Error handling and loading states
- ✅ Modern, responsive UI
- ✅ Real-time connection status

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A WalletConnect project ID (get one from [WalletConnect Cloud](https://cloud.walletconnect.com/))

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Wallet-Connect-V2-Integration
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`.

## Configuration

### Project ID

The WalletConnect project ID is configured in `src/components/ConnectWallet.js`:

```javascript
const core = new Core({
  projectId: '954f19ecde347bba3ace9c453bb92626' // Replace with your project ID
});
```

### Metadata

Update the metadata in `src/components/ConnectWallet.js` to match your application:

```javascript
const metadata = {
  name: 'Your App Name',
  description: 'Your app description',
  url: 'https://yourdomain.com', // Must match your domain
  icons: ['https://yourdomain.com/icon.png']
};
```

## Usage

### Connecting a Wallet

1. Click the "Connect Wallet" button
2. Scan the QR code with your mobile wallet app
3. Approve the connection in your wallet
4. Your account information will be displayed

### Disconnecting

Click the "Disconnect Wallet" button to disconnect your wallet.

## Project Structure

```
src/
├── components/
│   └── ConnectWallet.js    # Main wallet connection component
├── App.js                  # Main application component
├── App.css                 # Styling for the application
└── index.js               # Application entry point
```

## Dependencies

- `@walletconnect/core`: Core WalletConnect functionality
- `@reown/walletkit`: React wrapper for WalletConnect
- `react`: React framework
- `react-dom`: React DOM rendering

## Troubleshooting

### Common Issues

1. **Connection fails**: Ensure your project ID is correct and your domain matches the metadata URL
2. **QR code not appearing**: Check browser console for errors
3. **Wallet not connecting**: Make sure you're using a compatible wallet app

### Debug Mode

Enable debug logging by adding this to your browser console:

```javascript
localStorage.setItem('debug', 'wc:*');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For WalletConnect support, visit:
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [WalletConnect Discord](https://discord.gg/walletconnect)
