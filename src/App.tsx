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
    <div className="white-rounded mt-6 p-6 text-center shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Start now!</h3>
      <p className="text-gray-600 mb-4">Choose a way to connect your wallet</p>
      <WalletOptions />
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto text-center shadow-lg border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Key Token</h1>
          <p className="text-gray-600">
            Your NFTs, now with real value. Access exclusive content securely
            and privately.
          </p>
        </div>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          {/* <div className="white-rounded p-6 text-center shadow-md mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Key Token</h1>
            <p className="text-gray-600 mb-4">
              Your NFTs, now with real value. Access exclusive content securely
              and privately.
            </p>
          </div> */}
          <ConnectWallet />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

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
