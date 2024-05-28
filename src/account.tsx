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
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {provider && signer && (
        <ConnectToFhevm provider={provider} signer={signer} />
      )}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white text-sm text-gray-500 p-4 shadow">
        <p>You are connected as </p>
        {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
        <button className="button self-start" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div> */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-gray-100 text-sm text-gray-700 py-2 px-6 flex items-center justify-between shadow-inner">
        <div>
          <p>You are connected as:</p>
          {address && (
            <div className="font-medium text-gray-900">
              {ensName ? `${ensName} (${address})` : address}
            </div>
          )}
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div> */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 text-sm text-gray-700 py-2 px-6 flex items-center justify-between shadow-inner">
        <div>
          <p>You are connected as:</p>
          {address && (
            <div className="font-medium text-gray-900">
              {ensName ? `${ensName} (${address})` : address}
            </div>
          )}
          <p>
            Network:{' '}
            <span
              className={
                chain && chain.id === inco.id
                  ? 'text-green-600'
                  : 'text-red-600'
              }
            >
              {chain?.name}
            </span>
          </p>
          {!(chain && chain.id === inco.id) && (
            <div className="text-red-600">
              <p>
                You are not connected to the right network, switch to Inco
                Gentry Testnet!
              </p>
              <a
                href="https://docs.inco.org/getting-started/connect-metamask"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                See how to add the Inco Gentry Testnet to your wallet
              </a>
            </div>
          )}
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
