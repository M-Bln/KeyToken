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
  return <WalletOptions />;
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div>
          <h1>Welcome to Key Token</h1>
          <p>
            Your NFTs, now with real value. Access exclusive content securely
            and privately.
          </p>
          <ConnectWallet />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
