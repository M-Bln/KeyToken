import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import * as React from 'react';
import { useAccount, WagmiProvider } from 'wagmi';

import { Account } from './account';
import { config } from './connect-to-network/config';
import { WalletOptions } from './connect-to-network/wallet-options';
window.Buffer = Buffer;

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return (
    <div className="white-rounded mt-6">
      <h3 className="h3">Start now!</h3>
      <p> Chose a way to connect your wallet </p>
      <WalletOptions />
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-100 min-h-screen p-6">
          <div className="white-rounded">
            <h1 className="h1">Key Token</h1>
            <p>
              Your NFTs, now with real value. Access exclusive content securely
              and privately.
            </p>
          </div>
          <ConnectWallet />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
