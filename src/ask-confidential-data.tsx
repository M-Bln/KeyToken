import React, { useState } from 'react';
import { Signer } from 'ethers';
import { FhevmInstance } from 'fhevmjs';
import { AccessConfidentialData } from './access-confidential-data';

interface AccessConfidentialDataProps {
    instance: FhevmInstance;
    token: { publicKey: Uint8Array; signature: string };
    // publicKey: Uint8Array,
    // signature: string,
    signer: Signer,
}

export const AskConfidentialData: React.FC<AccessConfidentialDataProps> = ({ instance, token, signer }) => {
    const [tokenId, setTokenId] = useState<string | null>(null);
    const [signerAddress, setSignerAddress] = useState<`0x${string}` | null>(null);
    const [submitCounter, setSubmitCounter] = useState<number>(0);

    async function submit(e: React.FormEvent<HTMLFormElement>) { 
        setSubmitCounter(submitCounter + 1);
        e.preventDefault();
        const rawSignerAddress = await signer.getAddress(); 
        setSignerAddress(`0x${rawSignerAddress.substring(2)}`);
        const formData = new FormData(e.target as HTMLFormElement); 
        const newTokenId = formData.get('tokenId') as string;
        setTokenId(newTokenId);
      } 
    return(
        <form onSubmit={submit}>
        <input name="tokenId" placeholder="42" required />
        <button 
          type="submit"
        >
            Get confidential data
        </button>
        {tokenId && signerAddress &&  <AccessConfidentialData key={submitCounter} instance={instance} cid={tokenId} token={token} signerAddress={signerAddress}/>}
      </form>       
    )
}