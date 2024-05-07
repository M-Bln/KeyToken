import {
  useEthersProvider,
  useEthersSigner,
} from './connect-to-network/ethers_adapters';
import * as React from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { ConnectToFhevm } from './connect-to-network/connect-to-fhevm';

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = ensName
    ? useEnsAvatar({ name: ensName })
    : { data: undefined };
  const signer = useEthersSigner({ chainId: 9000 });
  const provider = useEthersProvider({ chainId: 9000 });

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {provider && signer && (
        <ConnectToFhevm provider={provider} signer={signer} />
      )}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
