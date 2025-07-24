// src/appkit-init.ts
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { bsc, bscTestnet } from "@reown/appkit/networks";

// Replace with your actual project ID
const projectId = process.env.REACT_APP_PROJECT_ID || "your-project-id";

// Networks to support
const networks = [bsc, bscTestnet];

// Optional: Add your website metadata
const metadata = {
  name: "The Meme TV",
  description: "Turning your screen time into earnings with memes and tokens.",
  url: "https://app.thememetv.com", // must match your deployed URL
  icons: ["https://avatars.mywebsite.com/"],
};

// Initialize AppKit
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true, //Optional
    email: false, //Optional\
    google: false, //Optional
    socials: false, //Optional,
  },
});
