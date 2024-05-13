import { decodeBase58 } from 'ethers';
import { FhevmInstance } from 'fhevmjs';
import * as React from 'react';
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { abi } from '../connect-to-network/abi';
import { config } from '../connect-to-network/config';
import { contractAddress } from '../network-config';

interface MintConfidentialTokenProps {
  instance: FhevmInstance;
  fileCid: string;
  contentEncryptionKey: bigint;
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
  // const [missingCidOrKeyError, setMissingCidOrKeyError] =
  //   React.useState<boolean>(false);

  function splitBigIntToUint64Array(bigInt: bigint): bigint[] {
    const euint64Array = [];
    for (let i = 0; i < 4; i++) {
      euint64Array[i] = bigInt % BigInt('0x10000000000000000');
      bigInt = bigInt / BigInt('0x10000000000000000');
      // euint64Array[i] = bigInt & BigInt(0xFFFFFFFFFFFFFFFF);
      // bigInt = bigInt >> BigInt(64);
    }
    return euint64Array;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (contentEncryptionKey === null || fileCid === null) {
      // setMissingCidOrKeyError(true);
      return;
    } else {
      // setMissingCidOrKeyError(false);
      const formData = new FormData(e.target as HTMLFormElement);
      //const tokenId = formData.get('tokenId') as string
      const address = formData.get('address') as `0x${string}`;
      // const clearData = BigInt('0x'+formData.get('data') as string)
      // console.log('clearData: ', clearData)
      const splitedEncryptionKey =
        splitBigIntToUint64Array(contentEncryptionKey);
      // console.log('splited clearData', splitedClearData);
      const encryptedData = splitedEncryptionKey
        .map((n) => instance?.encrypt64(n))
        .map(toHexString);
      console.log('encryptedData: ', encryptedData);
      // const encryptedData = splitBigIntToUint64Array(clearData).map(n => instance?.encrypt64(n)).map(toHexString);
      //const encryptedData = instance?.encrypt32(clearData)
      //const encryptedDataHex = toHexString(encryptedData ?? new Uint8Array())
      console.log(encryptedData);
      try {
        writeContract({
          address: contractAddress,
          abi,
          functionName: 'mintWithConfidentialData',
          args: [
            address,
            decodeBase58(fileCid.slice(4)),
            BigInt(1),
            encryptedData,
            '0x',
          ],
          gas: BigInt(10_000_000),
        });
      } catch (error) {
        console.log('error minting token: ', error);
        console.error(error);
      }
    }
    // writeContract({
    //   address: contractAddress,
    //   abi,
    //   functionName: 'mintWithConfidentialData',
    //   args: [address, BigInt(tokenId), BigInt(1), encryptedDataHex, '0x'],
    // })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit}>
      <label>Mint to: </label>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <label>Ammount to Mint</label>
      <input name="value" placeholder="1000" required />
      <button
        disabled={isPending || !fileCid || !contentEncryptionKey}
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Mint'}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).details || error.message}</div>
      )}
    </form>
  );
};

function toHexString(byteArray: Uint8Array | undefined | null): `0x${string}` {
  if (!byteArray) return '0x';
  return `0x${Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('')}`;
}
