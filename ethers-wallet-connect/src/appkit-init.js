// src/appkit-init.ts
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { arbitrum, mainnet } from "@reown/appkit/networks";

// Replace with your actual project ID
const projectId = process.env.REACT_APP_PROJECT_ID || "your-project-id";

// Networks to support
const networks = [arbitrum, mainnet];

// Optional: Add your website metadata
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // must match your deployed URL
  icons: ["https://avatars.mywebsite.com/"],
};

// Initialize AppKit
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true, // Optional
  },
});
