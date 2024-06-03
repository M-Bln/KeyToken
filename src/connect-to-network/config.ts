import { type Chain } from 'viem';
import { createConfig, http } from 'wagmi';
import { injected, safe } from 'wagmi/connectors';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

export const inco: Chain = {
  id: 9_090,
  name: 'Inco Gentry Testnet',
  nativeCurrency: {
    name: 'INCO',
    symbol: 'INCO',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'block explorer',
      url: 'https://explorer.testnet.inco.org',
    },
  },
  rpcUrls: {
    default: { http: ['https://testnet.inco.org/'] },
  },
};

export const config = createConfig({
  chains: [inco],
  connectors: [injected(), safe()],
  transports: {
    [inco.id]: http(),
  },
});
