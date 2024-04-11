import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
//import {type Chain} from 'viem'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

declare module 'wagmi' { 
  interface Register { 
    config: typeof config 
  } 
}



export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
