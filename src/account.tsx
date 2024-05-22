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
    <div className="flex">
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {provider && signer && (
        <ConnectToFhevm provider={provider} signer={signer} />
      )}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
