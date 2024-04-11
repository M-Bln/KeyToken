import * as React from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { MintNFT } from './mint-nft';

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = ensName ? useEnsAvatar({ name: ensName }) : { data: undefined };
  
    return (
      <div>
        {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
        <MintNFT />
        {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }