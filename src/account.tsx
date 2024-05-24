import * as React from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

import { ConnectToFhevm } from './connect-to-network/connect-to-fhevm';
import {
  useEthersProvider,
  useEthersSigner,
} from './connect-to-network/ethers_adapters';
import { chainId } from './network-config';

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = ensName
    ? useEnsAvatar({ name: ensName })
    : { data: undefined };
  const signer = useEthersSigner({ chainId: chainId });
  const provider = useEthersProvider({ chainId: chainId });

  return (
    <div className="pb-20">
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {provider && signer && (
        <ConnectToFhevm provider={provider} signer={signer} />
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-white text-sm text-gray-500 p-4 shadow">
        <p>You are connected as </p>
        {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
        <button className="button self-start" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    </div>
  );
}
