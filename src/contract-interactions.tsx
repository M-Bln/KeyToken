import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount } from 'wagmi';
import { config } from './connect-to-network/config';
import { Account } from './main-page';
import { WalletOptions } from './connect-to-network/wallet-options';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const queryClient = new QueryClient();
interface ContractInteractionsProps {
  fileCid: string | null;
}

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export function ContractInteractions() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
