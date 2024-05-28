import React, { useEffect } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { Connector, useConnect } from 'wagmi';

import { inco } from './config';

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      onClick={onClick}
      className={`text-center py-2 px-4 mb-4 text-white rounded-md shadow-sm transition-all duration-300 ${
        ready
          ? 'bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          : 'bg-gray-300 cursor-not-allowed'
      }`}
    >
      {connector.name}
    </button>
  );
}

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex justify-center space-x-4">
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  );
}

export function NetworkSwitcher() {
  const { isConnected, chain } = useAccount();
  // const { switchNetwork } = useSwitchAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isConnected && chain && chain.id !== inco.id) {
      switchChain({ chainId: inco.id });
    }
  }, [isConnected, chain, switchChain]);

  return null; // This component doesn't render anything
}

// import * as React from 'react';
// import { Connector, useConnect } from 'wagmi';

// function WalletOption({
//   connector,
//   onClick,
// }: {
//   connector: Connector;
//   onClick: () => void;
// }) {
//   const [ready, setReady] = React.useState(false);

//   React.useEffect(() => {
//     (async () => {
//       const provider = await connector.getProvider();
//       setReady(!!provider);
//     })();
//   }, [connector]);

//   return (
//     <button
//       disabled={!ready}
//       onClick={onClick}
//       className="button"
//       // className={`button ${!ready ? 'opacity-50 cursor-not-allowed' : ''}`}
//     >
//       {connector.name}
//     </button>
//   );
// }

// export function WalletOptions() {
//   const { connectors, connect } = useConnect();

//   return connectors.map((connector) => (
//     <WalletOption
//       key={connector.uid}
//       connector={connector}
//       onClick={() => connect({ connector })}
//     />
//   ));
// }
