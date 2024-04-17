import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { MintNFT } from './mint-nft';
import { AccessConfidentialData } from './access-confidential-data';
import { FhevmInstance } from 'fhevmjs';

interface ConnectToFhevmProps {
    provider: ethers.Provider;
    signer: ethers.Signer;
}

export const ConnectToFhevm: React.FC<ConnectToFhevmProps> = ({ provider, signer }) => {
    const [instance, setInstance] = useState<FhevmInstance | null>(null);

    useEffect(() => {
        const createInstance = async () => {
            const { createFhevmInstance } = await import('./create-fhevm-instance');
            const newInstance = await createFhevmInstance('0xF161F15261233Db423ba1D12eDcc086fa37AF4f3', signer, provider);
            setInstance(newInstance || null);
        };

        createInstance();
    }, [provider, signer]);
    // useEffect(() => {
    //     import('./create-fhevm-instance').then(async ({ createFhevmInstance }) => {
    //         const newInstance = createFhevmInstance('0xF161F15261233Db423ba1D12eDcc086fa37AF4f3', signer, provider);
    //         setInstance(await newInstance);
    //     });
    // }, [provider, signer]);
    return (
        <div>
            {instance && <MintNFT instance={instance} />}
            {!instance && <div>Failed to initiate instance</div>}
        </div>
    );
    //             {instance && <AccessConfidentialData instance={instance} />}
    //             {instance && <AccessConfidentialData instance={instance} />}
    // if (instance) {
    //     return (
    //         <MintNFT instance={instance}/>
    //         <AccessConfidentialData instance={instance}/>
    //     );
    // } else {
    //     return(
    //         <div>Failed to initiate instance</div>
    //     )
    // }
    // if (instance) {
    //     return (
    //         <MintNFT instance={instance}/>
    //     );
    // } else {
    //     return(
    //         {provider && signer && <ConnectToFhevm provider={provider}  signer={signer} />}
    //     )
    // }
};