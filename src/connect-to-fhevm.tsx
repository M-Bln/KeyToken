import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { MintNFT } from './mint-nft';
//import { AskConfidentialData } from './ask-confidential-data';
import { Web3Auth } from './web3-auth';
import { FhevmInstance } from 'fhevmjs';
import { UploadConfidentialContent } from './upload-confidential-content';
import { AccessConfidentialContent } from './access-confidential-content';

interface ConnectToFhevmProps {
  provider: ethers.Provider;
  signer: ethers.Signer;
}

export const ConnectToFhevm: React.FC<ConnectToFhevmProps> = ({
  provider,
  signer,
}) => {
  const [instance, setInstance] = useState<FhevmInstance | null>(null);
  const [token, setToken] = useState<{
    publicKey: Uint8Array;
    signature: string;
  } | null>(null);
  const [signerAddress, setSignerAddress] = useState<string | null>(null);

  const createInstance = async () => {
    const { createFhevmInstance } = await import('./create-fhevm-instance');
    const newSignerAddress = await signer.getAddress();
    setSignerAddress(newSignerAddress);
    const newInstance = await createFhevmInstance(
      '0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',
      signer,
      provider,
    );
    setInstance(newInstance || null);
    const generatedToken = newInstance.generatePublicKey({
      verifyingContract: '0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',
    });
    console.log('token publick key: ', generatedToken.publicKey);
    console.log('token eip712: ', generatedToken.eip712);
    console.log('token message: ', generatedToken.eip712.message);
    console.log('token type: ', {
      Reencrypt: generatedToken.eip712.types.Reencrypt,
    });
    console.log('token domain: ', generatedToken.eip712.domain);
    console.log('signer ', signer.getAddress());
    try {
      const signature = await signer.signTypedData(
        generatedToken.eip712.domain,
        { Reencrypt: generatedToken.eip712.types.Reencrypt }, // Need to remove EIP712Domain from types
        generatedToken.eip712.message,
      );
      console.log('signer ', signer);
      console.log('signature: ', signature);
      console.log('signer ', signer);
      newInstance.setSignature(
        '0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',
        signature,
      );
      const newToken = newInstance.getPublicKey(
        '0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',
      );
      console.log('newToken: ', newToken);
      console.log(
        'instance.getPublicKey: ',
        newInstance.getPublicKey('0xF161F15261233Db423ba1D12eDcc086fa37AF4f3'),
      );
      console.log('newToken public key: ', newToken?.publicKey);
      console.log('newToken signature: ', newToken?.signature);
      setToken(newToken || null);
    } catch {
      setInstance(null);
    }
  };

  // useEffect(() => {
  //     import('./create-fhevm-instance').then(async ({ createFhevmInstance }) => {
  //         const newInstance = createFhevmInstance('0xF161F15261233Db423ba1D12eDcc086fa37AF4f3', signer, provider);
  //         setInstance(await newInstance);
  //     });
  // }, [provider, signer]);

  return (
    <div>
      {!instance && (
        <button
          onClick={createInstance}
          disabled={instance !== null && token === null}
        >
          Create Fhevm Instance
        </button>
      )}
      {instance && !token && (
        <div>
          Waiting for fhevm instance, require to sign publick key with metamask
        </div>
      )}
      {instance && token && <UploadConfidentialContent instance={instance} />}
      {instance && signerAddress && token && (
        <AccessConfidentialContent
          instance={instance}
          signerAddress={signerAddress}
          token={token}
        />
      )}
      {/* {instance && token && <MintNFT instance={instance} />}
            {instance && token && <AskConfidentialData instance={instance} publicKey={token.publicKey} signature={token.signature} signer={signer} />} */}
    </div>
  );
  //           {instance && token && <AccessConfidentialData instance={instance} tokenId={"5"}
  // publicKey={token.publicKey} signature={token.signature} signerAddress={`0xf0A5B532fc2A5D8E324Cc2D7c61DBFdC100D391e`}/>}
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
