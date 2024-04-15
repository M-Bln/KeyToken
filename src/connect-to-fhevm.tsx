import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { MintNFT } from './mint-nft';
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
        <MintNFT/>
    );
};