# DecentSocial Frontend

The frontend application for the DecentSocial decentralized microblogging platform.

## Technology Stack

- **Next.js**: React framework with App Router
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **RainbowKit**: User-friendly Ethereum wallet connection
- **Wagmi**: React Hooks for Ethereum
- **Ethers.js**: Ethereum library for wallet interactions

## Directory Structure

- `/src/app`: Next.js App Router pages
- `/src/components`: React components
- `/src/context`: React Context for state management
- `/src/hooks`: Custom React hooks
- `/src/services`: API service modules
- `/src/types`: TypeScript interfaces and types
- `/src/utils`: Utility functions
- `/src/config`: Configuration files
- `/public`: Static assets

## Setup and Running

1. Install dependencies
```bash
npm install
```

2. Set up environment variables
Create a `.env.local` file with:
```
# Application URLs
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Web3 Configuration
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_NETWORK=mainnet

# Optional: Infura API key (if you have one)
NEXT_PUBLIC_INFURA_ID=your_infura_id_here
```

3. Start the development server
```bash
npm run dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
