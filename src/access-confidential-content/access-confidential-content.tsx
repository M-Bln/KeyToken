import { FhevmInstance } from 'fhevmjs';
import React, { useState } from 'react';

import { AccessConfidentialData } from './access-confidential-data';

interface AccessConfidentialContentProps {
  instance: FhevmInstance;
  signerAddress: string;
  token: { publicKey: Uint8Array; signature: string };
}

export const AccessConfidentialContent: React.FC<
  AccessConfidentialContentProps
> = ({ instance, signerAddress, token }) => {
  //const [tokenId, setTokenId] = useState<string | null >(null)
  const [cid, setCid] = useState<string | null>(null);
  const [cidInputField, setCidInputField] = useState<string>('');
  const [encryptedFile, setEncryptedFile] = useState<Uint8Array | null>(null);
  // const [clearFile, setClearFile] = useState<Uint8Array>(new Uint8Array(0));
  const [encryptionKey, setEncryptionKey] = useState<string>('');
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const loadEncryptedFile = async () => {
    try {
      setCid(cidInputField);
      const response = await fetch(
        `https://cloudflare-ipfs.com/ipfs/${cidInputField}`,
      );
      //const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
      console.log('response: ', response);
      const data = await response.arrayBuffer();
      console.log('data: ', data);
      const fileAsUint8Array = new Uint8Array(data);
      console.log('file as Uint8Array: ', fileAsUint8Array);
      setEncryptedFile(fileAsUint8Array);
      setLoadingError(null);
    } catch (error) {
      setLoadingError('Error fetching encrypted file' + (error as string));
      //console.error('Error fetching encrypted file', error);
    }
  };

  const decryptFile = async () => {
    console.log('encrypted file: ', encryptedFile);
    console.log('encryption key: ', encryptionKey);
    if (encryptedFile && encryptionKey.length > 0) {
      // Convert the encryption key back to a Uint8Array
      const key = new Uint8Array(
        (encryptionKey.match(/.{1,2}/g) || []).map((byte) =>
          parseInt(byte, 16),
        ),
      );
      console.log('get key: ', key);
      // Decrypt the file
      const iv = encryptedFile.slice(0, 12); // Assuming the iv is the first 12 bytes of the encrypted file
      console.log('get iv: ', iv);
      const data = encryptedFile.slice(12);
      console.log('get encrypted data: ', data);
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        'AES-GCM',
        false,
        ['decrypt'],
      );
      const decryptedFile = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        cryptoKey,
        data,
      );
      const decryptedFileAsUint8Array = new Uint8Array(decryptedFile);
      console.log('decrypted file: ', decryptedFileAsUint8Array);
      // Convert the decrypted file to a Uint8Array and set the clearFile state
      // setClearFile(decryptedFileAsUint8Array);

      // Create a Blob from the decrypted file
      const blob = new Blob([decryptedFileAsUint8Array]);

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');

      // Set the link's href to the Blob URL
      link.href = url;

      // Set the download attribute to the desired file name
      link.download = 'decrypted-file';

      // Append the link to the body
      document.body.appendChild(link);

      // Programmatically click the link to start the download
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    }
  };

  return (
    // <//"p-6 bg-white rounded-md shadow-sm"div className= "white-rounded">
    <div className="primary-light-rounded">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-4"> */}
      <h1 className="h1">Access Confidential Content</h1>
      {/* <form onSubmit={loadEncryptedFile} className="p-4 rounded-md">
        <div className="mb-4 flex items-center space-x-4">
          <label
            htmlFor="CID"
            className="block text-neutral-dark text-lg font-bold mb-2"
          >
            CID:
          </label>
          <input
            type="text"
            id="CID"
            onChange={(e) => setCidInputField(e.target.value)}
            required
            className="input-field flex-grow"
          />
          <button type="submit" className="button ml-auto">
            Load encrypted file
          </button>
        </div>
        {loadingError && (
          <div className="text-red-500 mb-4">{loadingError}</div>
        )}
      </form> */}

      <div className="mb-4 flex items-center space-x-4">
        <label
          htmlFor="CID"
          className="block text-neutral-dark text-lg font-bold mb-2"
        >
          CID:
        </label>
        <input
          type="text"
          id="CID"
          onChange={(e) => setCidInputField(e.target.value)}
          className="input-field flex-grow"
        />
        <button
          disabled={cidInputField === ''}
          onClick={loadEncryptedFile}
          className="button ml-auto"
        >
          Load encrypted file
        </button>
      </div>
      {loadingError && <div className="text-red-500 mb-4">{loadingError}</div>}

      {cid && encryptedFile && (
        <AccessConfidentialData
          instance={instance}
          cid={cid}
          token={token}
          signerAddress={signerAddress}
          setEncryptionKey={setEncryptionKey}
        />
      )}
      {encryptedFile && encryptionKey !== '' && (
        <button
          onClick={decryptFile}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Decrypt content
        </button>
      )}
      {/* 
      <div className="mb-4">
        <label htmlFor="CID" className="block text-gray-700 mb-2">
          Confidential content CID:
        </label>
        <input
          type="text"
          id="CID"
          onChange={(e) => setCidInputField(e.target.value)}
          className="block w-full text-gray-600 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {cidInputField !== '' && (
        <button
          onClick={loadEncryptedFile}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-4"
        >
          Load encrypted file
        </button>
      )}
      {loadingError && <div className="text-red-500 mb-4">{loadingError}</div>}

      {cid && encryptedFile && (
        <AccessConfidentialData
          instance={instance}
          cid={cid}
          token={token}
          signerAddress={signerAddress}
          setEncryptionKey={setEncryptionKey}
        />
      )}
      {encryptedFile && encryptionKey !== '' && (
        <button
          onClick={decryptFile}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Decrypt content
        </button>
      )} */}
    </div>
  );
};
