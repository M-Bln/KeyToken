import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import * as React from 'react';
import { useAccount, WagmiProvider } from 'wagmi';

import { Account } from './account';
import { ReactComponent as ChestIcon } from './chest-key.svg';
import { config } from './connect-to-network/config';
import {
  NetworkSwitcher,
  WalletOptions,
} from './connect-to-network/wallet-options';
import topography from './topography.svg';
window.Buffer = Buffer;

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return (
    <div className="primary-light-rounded">
      <h3 className="text-2xl font-semibold text-primary-dark mb-4">
        Start now!
      </h3>
      <div className="text-primary-dark mb-4 space-y-2">
        <p>The app works on Inco Gentry Testnet. Follow these steps:</p>
        <p>
          <span className="font-semibold">1st step:</span>
          <a
            href="https://docs.inco.org/getting-started/connect-metamask"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dark hover:underline ml-1"
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
            className="text-primary-dark hover:underline ml-1"
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
  );
}

// function App() {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <div className="min-h-screen bg-neutral-light flex flex-col items-center justify-center">
//           <div className="fixed top-0 w-full bg-primary z-50 shadow-md text-center p-4 relative">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <ChestIcon className="w-24 h-24 opacity-10" />
//             </div>
//             <div className="relative">
//               <h1 className="text-4xl font-bold text-neutral-light mb-2">
//                 Key Token
//               </h1>
//               <p className="text-neutral-light">
//                 Your NFTs, now with real value. Access exclusive content
//                 securely and privately.
//               </p>
//             </div>
//           </div>
//           <div className="pt-24 flex flex-col items-center">
//             <ConnectWallet />
//             <NetworkSwitcher />
//           </div>
//         </div>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div
          className="min-h-screen bg-neutral-light flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url(${topography})`, // set the SVG as a background image
            backgroundSize: 'cover', // make the image cover the entire page
            backgroundRepeat: 'no-repeat', // prevent the image from repeating
          }}
        >
          <div className="fixed top-0 w-full bg-primary z-50 shadow-md grid grid-cols-3 p-4">
            <div></div> {/* Empty div for the first column */}
            <div className="col-start-2 col-end-3 text-center">
              <h1 className="text-4xl font-bold text-neutral-light mb-2">
                Key Token
              </h1>
              <p className="text-neutral-light">
                Your NFTs, now with real value. Access exclusive content
                securely and privately.
              </p>
            </div>
            <div className="col-start-3 col-end-4 flex justify-end">
              <ChestIcon className="w-24 h-24 mr-2" />
            </div>
          </div>
          {/* <div className="fixed top-0 w-full bg-primary z-50 shadow-md flex justify-center p-4">
            <div className="flex flex-col justify-center text-center mx-auto">
              <h1 className="text-4xl font-bold text-neutral-light mb-2">
                Key Token
              </h1>{' '}
              <p className="text-neutral-light">
                Your NFTs, now with real value. Access exclusive content
                securely and privately.
              </p>
            </div>
            <ChestIcon className="w-24 h-24 mr-2 ml-auto" />
          </div> */}
          <div className="pt-24 flex flex-col items-center">
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
//         <div className="min-h-screen bg-neutral-light flex flex-col items-center justify-center">
//           <div className="fixed top-0 w-full bg-primary z-50 shadow-md text-center p-4">
//             <h1 className="text-4xl font-bold text-neutral-light mb-2">
//               Key Token
//             </h1>
//             <ChestIcon className="w-24 h-24 mr-2 ml-auto" />
//             <p className="text-neutral-light">
//               Your NFTs, now with real value. Access exclusive content securely
//               and privately.
//             </p>
//           </div>
//           <div className="pt-24 flex flex-col items-center">
//             <ConnectWallet />
//             <NetworkSwitcher />
//           </div>
//         </div>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

export default App;
