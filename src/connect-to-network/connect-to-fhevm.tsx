import { ethers } from 'ethers';
import { FhevmInstance } from 'fhevmjs';
import React, { useState } from 'react';

import { AccessConfidentialContent } from '../access-confidential-content/access-confidential-content';
import key from '../key.svg';
import { UploadConfidentialContent } from '../mint-confidential-content/upload-confidential-content';
import { contractAddress } from '../network-config';

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
      contractAddress,
      signer,
      provider,
    );
    setInstance(newInstance || null);
    const generatedToken = newInstance.generatePublicKey({
      verifyingContract: contractAddress,
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
      newInstance.setSignature(contractAddress, signature);
      const newToken = newInstance.getPublicKey(contractAddress);
      console.log('newToken: ', newToken);
      console.log(
        'instance.getPublicKey: ',
        newInstance.getPublicKey(contractAddress),
      );
      console.log('newToken public key: ', newToken?.publicKey);
      console.log('newToken signature: ', newToken?.signature);
      setToken(newToken || null);
    } catch {
      setInstance(null);
    }
  };

  return (
    <div>
      {!instance && (
        <div className="flex justify-center items-center space-x-8">
          <div className="animate-fade-in-down">
            <div
              className="w-48 h-48 bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${key})`,
                transform: 'scaleX(-1) rotate(90deg)',
              }}
            ></div>
          </div>
          <div className="primary-light-rounded flex flex-col justify-center items-center opacity-0 animate-fade-in">
            <div className="font-semibold">
              To interact with the fhEVM you first need to initiate an instance
              by exchanging keys
            </div>
            <button
              onClick={createInstance}
              disabled={instance !== null && token === null}
              className="button"
            >
              Exchange Keys
            </button>
          </div>
          <div
            className="w-48 h-48 bg-cover bg-no-repeat animate-fade-in-up"
            style={{
              backgroundImage: `url(${key})`,
            }}
          ></div>
        </div>
      )}
      {instance && !token && (
        <div className="flex justify-center items-center space-x-8">
          <div className="animate-left-key">
            <div
              className="w-48 h-48 bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${key})`,
                transform: 'scaleX(-1) rotate(90deg)',
              }}
            ></div>
          </div>
          <div className="primary-light-rounded opacity-0 animate-fade-in">
            Waiting for fhevm instance, require to sign public key with metamask
          </div>
          <div
            className="w-48 h-48 bg-cover bg-no-repeat animate-right-key"
            style={{
              backgroundImage: `url(${key})`,
            }}
          ></div>
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
    </div>
  );
};
