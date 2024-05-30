import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import * as React from 'react';
import { useAccount, WagmiProvider } from 'wagmi';

import { Account } from './account';
import { config } from './connect-to-network/config';
import {
  NetworkSwitcher,
  WalletOptions,
} from './connect-to-network/wallet-options';
window.Buffer = Buffer;

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return (
    <div className="white-rounded mt-6 p-6 text-center shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Start now!</h3>
      <div className="text-gray-600 mb-4 space-y-2">
        <p>The app works on Inco Gentry Testnet. Follow these steps:</p>
        <p>
          <span className="font-semibold">1st step:</span>
          <a
            href="https://docs.inco.org/getting-started/connect-metamask"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline ml-1"
          >
            Add Inco Gentry Testnet to your wallet
          </a>
        </p>
        <p>
          <span className="font-semibold">2nd step:</span> Get funds with the
          <a
            href="https://docs.inco.org/getting-started/faucet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline ml-1"
          >
            Faucet
          </a>
        </p>
        <p>
          <span className="font-semibold">3rd step:</span> Choose a way to
          connect your wallet
        </p>
      </div>
      <WalletOptions />
    </div>
    // <div className="white-rounded mt-6 p-6 text-center shadow-sm">
    //   <h3 className="text-2xl font-semibold text-gray-800 mb-4">Start now!</h3>
    //   <p className="text-gray-600 mb-4">
    //     The app works on Gentry testnet 1st step, add Inco Gentry Tesnet to you
    //     wallet https://docs.inco.org/getting-started/connect-metamask 2nd step,
    //     get funds with faucet 3rd step, chose a way to connect your waller
    //   </p>{' '}
    //   <WalletOptions />
    // </div>
  );
}
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <div className="fixed top-0 w-full bg-white z-50 shadow-md text-center p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Key Token</h1>
            <p className="text-gray-600">
              Your NFTs, now with real value. Access exclusive content securely
              and privately.
            </p>
          </div>
          <div className="pt-24">
            <ConnectWallet />
            <NetworkSwitcher />
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// function App() {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//           <div className="container mx-auto text-center shadow-lg border-b border-gray-200">
//             <h1 className="text-4xl font-bold text-gray-800 mb-2">Key Token</h1>
//             <p className="text-gray-600">
//               Your NFTs, now with real value. Access exclusive content securely
//               and privately.
//             </p>
//           </div>
//           {/* <div className="white-rounded p-6 text-center shadow-md mb-6">
//             <h1 className="text-4xl font-bold text-gray-800 mb-4">Key Token</h1>
//             <p className="text-gray-600 mb-4">
//               Your NFTs, now with real value. Access exclusive content securely
//               and privately.
//             </p>
//           </div> */}
//           <ConnectWallet />
//           <NetworkSwitcher />
//         </div>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

export default App;

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Buffer } from 'buffer';
// import * as React from 'react';
// import { useAccount, WagmiProvider } from 'wagmi';

// import { Account } from './account';
// import { config } from './connect-to-network/config';
// import { WalletOptions } from './connect-to-network/wallet-options';
// window.Buffer = Buffer;

// const queryClient = new QueryClient();

// function ConnectWallet() {
//   const { isConnected } = useAccount();
//   if (isConnected) return <Account />;
//   return (
//     <div className="white-rounded mt-6">
//       <h3 className="h3">Start now!</h3>
//       <p> Chose a way to connect your wallet </p>
//       <WalletOptions />
//     </div>
//   );
// }

// function App() {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         {/* <div className="bg-gray-100 min-h-screen p-6"> */}
//         <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//           <div className="white-rounded">
//             <h1 className="h1">Key Token</h1>
//             <p>
//               Your NFTs, now with real value. Access exclusive content securely
//               and privately.
//             </p>
//           </div>
//           <ConnectWallet />
//         </div>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

// export default App;
