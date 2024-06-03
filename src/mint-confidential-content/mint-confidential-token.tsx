import { decodeBase58 } from 'ethers';
import { FhevmInstance } from 'fhevmjs';
import * as React from 'react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { abi } from '../connect-to-network/abi';
import { config } from '../connect-to-network/config';
import { contractAddress } from '../network-config';

interface MintConfidentialTokenProps {
  instance: FhevmInstance;
  fileCid: string | null;
  contentEncryptionKey: bigint | null;
}

export const MintConfidentialToken: React.FC<MintConfidentialTokenProps> = ({
  instance,
  fileCid,
  contentEncryptionKey,
}) => {
  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract({ config });

  function splitBigIntToUint32Array(bigInt: bigint): bigint[] {
    const euint32Array = [];
    for (let i = 0; i < 8; i++) {
      euint32Array[i] = bigInt % BigInt('0x100000000');
      bigInt = bigInt / BigInt('0x100000000');
    }
    return euint32Array;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (contentEncryptionKey === null || fileCid === null) {
      return;
    } else {
      const formData = new FormData(e.target as HTMLFormElement);
      const address = formData.get('address') as `0x${string}`;
      const amount = BigInt(formData.get('amount') as string);
      const splitedEncryptionKey =
        splitBigIntToUint32Array(contentEncryptionKey);
      const encryptedData = splitedEncryptionKey
        .map((n) => instance?.encrypt32(n))
        .map(toHexString);
      try {
        writeContract({
          address: contractAddress,
          abi,
          functionName: 'mintWithConfidentialData',
          args: [
            address,
            decodeBase58(fileCid.slice(4)),
            amount,
            encryptedData,
            '0x',
          ],
        });
      } catch (error) {
        console.log('error minting token: ', error);
        console.error(error);
      }
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit} className="p-4 rounded-md">
      <div className="mb-4 flex items-center space-x-4">
        <label
          htmlFor="address"
          className="block text-neutral-dark text-lg font-bold mb-2 whitespace-nowrap"
        >
          Mint to:
        </label>
        <input
          name="address"
          id="address"
          placeholder="0xA0Cf…251e"
          required
          className="input-field w-full"
        />
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <label
          htmlFor="amount"
          className="block text-neutral-dark text-lg font-bold mb-2"
        >
          Amount to Mint:
        </label>
        <input
          name="amount"
          id="amount"
          placeholder="1000"
          required
          className="input-field flex-grow"
        />
        <button
          disabled={isPending || !fileCid || !contentEncryptionKey}
          type="submit"
          className="button ml-auto"
        >
          {isPending ? 'Confirming...' : 'Mint'}
        </button>
      </div>
      <div className="flex text-negative items-center space-x-4">
        {contentEncryptionKey === null && (
          <div>
            Unknown content encryption key! You need first to encrypt the
            content
          </div>
        )}
        {!fileCid && contentEncryptionKey !== null && (
          <div>
            Unknown CID! <br /> You need first to upload to lighthouse or to
            manually fill in the CID
          </div>
        )}
      </div>
      {hash && (
        <div className="mt-4 text-green-500">Transaction Hash: {hash}</div>
      )}
      {isConfirming && (
        <div className="mt-4 text-yellow-500">Waiting for confirmation...</div>
      )}
      {isConfirmed && (
        <div className="mt-4 text-green-500">Transaction confirmed.</div>
      )}
      {error && (
        <div className="mt-4 text-negative">Error: {error.message}</div>
      )}
    </form>
  );
};

function toHexString(byteArray: Uint8Array | undefined | null): `0x${string}` {
  if (!byteArray) return '0x';
  return `0x${Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('')}`;
}
