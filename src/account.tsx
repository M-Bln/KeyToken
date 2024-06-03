import * as React from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

import { inco } from './connect-to-network/config';
import { ConnectToFhevm } from './connect-to-network/connect-to-fhevm';
import {
  useEthersProvider,
  useEthersSigner,
} from './connect-to-network/ethers_adapters';
import { chainId } from './network-config';

export function Account() {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = ensName
    ? useEnsAvatar({ name: ensName })
    : { data: undefined };
  const signer = useEthersSigner({ chainId: chainId });
  const provider = useEthersProvider({ chainId: chainId });

  return (
    <div className="pb-20">
      {ensAvatar && (
        <img
          alt="ENS Avatar"
          src={ensAvatar}
          className="rounded-full w-16 h-16 mb-4"
        />
      )}
      {provider && signer && (
        <ConnectToFhevm provider={provider} signer={signer} />
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-dark text-sm text-neutral-light py-2 px-6 flex items-center justify-between shadow-inner-lg">
        <div>
          <p>You are connected as:</p>
          {address && (
            <div className="font-medium text-neutral-light">
              {ensName ? `${ensName} (${address})` : address}
            </div>
          )}
          <p>
            Network:{' '}
            <span
              className={
                chain && chain.id === inco.id
                  ? 'text-accent-light'
                  : 'text-negative-light'
              }
            >
              {chain?.name}
            </span>
          </p>
          {!(chain && chain.id === inco.id) && (
            <div className="text-negative-light">
              <p>
                You are not connected to the right network, switch to Inco
                Gentry Testnet!
              </p>
              <a
                href="https://docs.inco.org/getting-started/connect-metamask"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-neutral-light"
              >
                See how to add the Inco Gentry Testnet to your wallet
              </a>
            </div>
          )}
        </div>
        <button className="button-negative" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    </div>
  );
}
