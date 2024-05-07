import * as React from 'react';
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { abi } from '../connect-to-network/abi';
import { FhevmInstance } from 'fhevmjs';

interface MintNFTProps {
  instance: FhevmInstance;
}

export const MintNFT: React.FC<MintNFTProps> = ({ instance }) => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

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
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenId = formData.get('tokenId') as string;
    const address = formData.get('address') as `0x${string}`;
    const clearData = BigInt(('0x' + formData.get('data')) as string);
    console.log('clearData: ', clearData);
    const splitedClearData = splitBigIntToUint64Array(clearData);
    console.log('splited clearData', splitedClearData);
    const encryptedData = splitedClearData
      .map((n) => instance?.encrypt64(n))
      .map(toHexString);
    console.log('encryptedData: ', encryptedData);
    // const encryptedData = splitBigIntToUint64Array(clearData).map(n => instance?.encrypt64(n)).map(toHexString);
    //const encryptedData = instance?.encrypt32(clearData)
    //const encryptedDataHex = toHexString(encryptedData ?? new Uint8Array())
    console.log(encryptedData);
    try {
      writeContract({
        address: '0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',
        abi,
        functionName: 'mintWithConfidentialData',
        args: [address, BigInt(tokenId), BigInt(1), encryptedData, '0x'],
      });
    } catch (error) {
      console.error(error);
      // Handle the error in your application, e.g. by setting an error state
    }
    // writeContract({
    //   address: '0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',
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
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <input name="tokenId" placeholder="42" required />
      <input name="data" placeholder="65" required />
      <button disabled={isPending} type="submit">
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

function toHexString(byteArray: Uint8Array | null): `0x${string}` {
  if (!byteArray) return '0x';
  return `0x${Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('')}`;
}
