import { type Chain } from 'viem';
import { createConfig, http } from 'wagmi';
import { injected, safe } from 'wagmi/connectors';
// import { polygon } from 'wagmi/chains';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

// const fheLocalhost: Chain = {
//   id: 9_000,
//   name: 'fheLocalhost',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'tEVMOS',
//     symbol: 'TEVMOS',
//   },
//   rpcUrls: {
//     default: { http: ['http://127.0.0.1:8545'] },
//   },
// };

// export const config = createConfig({
//   chains: [fheLocalhost],
//   connectors: [injected(), safe()],
//   transports: {
//     [fheLocalhost.id]: http(),
//   },
// });

const inco: Chain = {
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

// const zama: Chain = {
//   id: 8_009,
//   name: 'Zama Network',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'ZAMA',
//     symbol: 'ZAMA',
//   },
//   rpcUrls: {
//     default: { http: ['https://devnet.zama.ai'] },
//   },
// };

// export const config = createConfig({
//   chains: [zama],
//   connectors: [injected(), safe()],
//   transports: {
//     [zama.id]: http(),
//   },
// });
