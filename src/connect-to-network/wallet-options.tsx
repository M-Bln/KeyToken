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
    <button disabled={!ready} onClick={onClick} className="button">
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
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isConnected && chain && chain.id !== inco.id) {
      switchChain({ chainId: inco.id });
    }
  }, [isConnected, chain, switchChain]);

  return null;
}
