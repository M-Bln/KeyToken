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
  // publicKey: Uint8Array,
  // signature: string,
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

  //const [stringContentKey, setStringContentKey] = useState<string | null>(null);

  //const clearData = reencryptedData ?
  //instance.decrypt(contractAddress,reencryptedData as string) as unknown as string: ""

  // Inside AccessConfidentialData component
  useEffect(() => {
    // Assume getEncryptionKey is a function that retrieves the encryption key
    if (reencryptedData) {
      const newStringContentKey = decryptAndCombineEuint32Array(
        reencryptedData as string[],
      );
      setEncryptionKey(newStringContentKey.toString(16));
    } else {
      setEncryptionKey('');
    }
  }, [reencryptedData]);

  // function decryptAndCombineEuint64Array(encryptedData: string[]): bigint {
  //   return [...encryptedData].reverse().reduce((combined, data) => {
  //     const decrypted = instance.decrypt(contractAddress, data);
  //     return (combined << BigInt(64)) + decrypted;
  //   }, BigInt(0));
  // }

  function decryptAndCombineEuint32Array(encryptedData: string[]): bigint {
    return [...encryptedData].reverse().reduce((combined, data) => {
      const decrypted = instance.decrypt(contractAddress, data);
      return (combined << BigInt(32)) + decrypted;
    }, BigInt(0));
  }

  // function decryptAndCombineEuint64Array(encryptedData: string[]): bigint {
  //   let combined = BigInt(0);
  //   for (let i = encryptedData.length -1 ; i >= 0 ; i--) {
  //       const decrypted = instance.decrypt(contractAddress, encryptedData[i]);
  //       combined = (combined << BigInt(64)) + BigInt(decrypted);
  //   }
  //   return combined;
  // }

  return (
    // <div className="p-4 bg-white rounded-md shadow-sm">
    //   {reencryptedData && (
    //     <div className="text-gray-800 mb-4">
    //       Content key:{' '}
    //       {reencryptedData
    //         .map((item) => decryptAndCombineEuint32Array(item))
    //         .join(', ')}
    //     </div>
    //   )}
    //   {isPending && <div className="text-gray-800 mb-4">Loading...</div>}
    //   {error && (
    //     <div className="text-red-500">
    //       Error: {(error as BaseError).details || error.message}
    //     </div>
    //   )}
    // </div>
    <div className="p-4 bg-white rounded-md shadow-sm">
      {(reencryptedData as string) && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md text-gray-700">
          Content key:{' '}
          <code className="text-sm text-gray-800 break-words">
            {decryptAndCombineEuint32Array(
              reencryptedData as string[],
            ).toString(16)}
          </code>
        </div>
        // <div className="text-gray-800 mb-4">
        //   {' '}
        //   Content key:{' '}
        //   {decryptAndCombineEuint32Array(reencryptedData as string[]).toString(
        //     16,
        //   )}{' '}
        // </div>
      )}
      {isPending && <div className="text-gray-800 mb-4">Loading...</div>}
      {error && (
        <div className="text-red-500">
          Error: {(error as unknown as BaseError).details || error.message}
        </div>
      )}
    </div>
  );

  //   if (isPending) return <div>Loading...</div>

  //   if (error)
  //     return (
  //       <div>
  //         Error: {(error as unknown as BaseError).shortMessage || error.message}
  //       </div>
  //     )

  //   return (
  //     <div>Balance: {balance?.toString()}</div>
  //   )
};
function bytesToString(byteArray: Uint8Array): `0x${string}` {
  return `0x${Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('')}`;
}
