import { decodeBase58 } from 'ethers';
import { FhevmInstance } from 'fhevmjs';
import React, { useEffect } from 'react';
import {
  type BaseError,
  useReadContract,
  type UseReadContractReturnType,
} from 'wagmi';

import { abi } from '../connect-to-network/abi';
import { contractAddress } from '../network-config';

interface AccessConfidentialDataProps {
  instance: FhevmInstance;
  cid: string;
  signerAddress: string;
  token: { publicKey: Uint8Array; signature: string };
  setEncryptionKey: (encryptionKey: string) => void;
}

export const AccessConfidentialData: React.FC<AccessConfidentialDataProps> = ({
  instance,
  cid,
  signerAddress,
  token,
  setEncryptionKey,
}) => {
  const {
    data: reencryptedData,
    error,
    isPending,
  }: UseReadContractReturnType = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getConfidentialData',
    args: [
      decodeBase58(cid.slice(4)),
      bytesToString(token.publicKey),
      `0x${token.signature.substring(2)}`,
    ],
    account: `0x${signerAddress.substring(2)}`,
  });

  useEffect(() => {
    if (reencryptedData) {
      const newStringContentKey = decryptAndCombineEuint32Array(
        reencryptedData as string[],
      );
      setEncryptionKey(newStringContentKey.toString(16));
    } else {
      setEncryptionKey('');
    }
  }, [reencryptedData]);

  function decryptAndCombineEuint32Array(encryptedData: string[]): bigint {
    return [...encryptedData].reverse().reduce((combined, data) => {
      const decrypted = instance.decrypt(contractAddress, data);
      return (combined << BigInt(32)) + decrypted;
    }, BigInt(0));
  }

  return (
    <div className="p-4">
      {(reencryptedData as string) && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md text-gray-700">
          <strong>Content key:</strong>{' '}
          <code className="text-sm text-gray-800 break-words">
            {decryptAndCombineEuint32Array(
              reencryptedData as string[],
            ).toString(16)}
          </code>
        </div>
      )}
      {isPending && <div className="text-gray-800 mb-4">Loading...</div>}
      {error && (
        <div className="text-red-500">
          Error: {(error as unknown as BaseError).details || error.message}
        </div>
      )}
    </div>
  );
};
function bytesToString(byteArray: Uint8Array): `0x${string}` {
  return `0x${Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('')}`;
}
