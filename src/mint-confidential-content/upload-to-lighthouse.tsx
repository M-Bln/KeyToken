import lighthouse from '@lighthouse-web3/sdk';
import React, { useState } from 'react';

interface UploadToLighthouseProps {
  encryptedFile: Uint8Array;
  setFileCid: (cid: string) => void;
  fileCid: string | null;
}

export const UploadToLighthouse: React.FC<UploadToLighthouseProps> = ({
  encryptedFile,
  setFileCid,
  fileCid,
}) => {
  const [lighthouseApiKey, setLighthouseApiKey] = useState<string | null>(null);
  function createFileList(file0: File, file1: File) {
    return {
      length: 2,
      item: (index: number) => (index == 0 ? file0 : file1),
      0: file0,
      1: file1,
    };
  }

  const uploadEncryptedFile = async () => {
    if (lighthouseApiKey) {
      console.log('Uploading encrypted file to lighthouse');
      console.log('Encrypted File:', encryptedFile);
      const blob = new Blob([encryptedFile], {
        type: 'application/octet-stream',
      });
      const blob2 = new Blob([encryptedFile, encryptedFile], {
        type: 'application/octet-stream',
      });
      const file0 = new File([blob], 'encrypted-file0.txt');
      const file1 = new File([blob2], 'encrypted-file1.txt');
      const fileList = createFileList(file0, file1);

      const buffer = encryptedFile.buffer;
      console.log('Encrypted File Buffer:', buffer);
      const output = await lighthouse.upload(
        fileList,
        lighthouseApiKey,
        true,
        undefined,
      );
      console.log('File Status:', output);
      console.log(
        'Visit 0 at https://gateway.lighthouse.storage/ipfs/' +
          output.data[0].Hash,
      );
      console.log(
        'Visit 1 at https://gateway.lighthouse.storage/ipfs/' +
          output.data[1].Hash,
      );
      setFileCid(output.data[0].Hash);
    } else {
      console.log('Please provide lighthouse api key');
    }
  };

  return (
    <div>
      <p className="text-neutral-dark mb-4">
        Then you rely on a third party for storing and availability of content.
        Lighthouse offers free limited storage. It requires only a crypto wallet
        to login and to obtain an API key at{' '}
        <a
          href="https://www.lighthouse.storage/"
          target="_blank"
          rel="noopener noreferrer"
          className="http-link"
        >
          Lighthouse Storage
        </a>
        .
      </p>
      <p className="text-neutral-dark mb-4">
        You can then later buy storage on the FileCoin network for a
        decentralized approach.
      </p>
      <div className="mb-4 flex items-center space-x-4">
        <label
          htmlFor="lighthouseApiKey"
          className="block text-neutral-dark text-lg font-bold mb-2 whitespace-nowrap"
        >
          Lighthouse API Key:
        </label>
        <input
          type="text"
          id="lighthouseApiKey"
          onChange={(e) => setLighthouseApiKey(e.target.value)}
          className="input-field w-full"
        />
      </div>
      {lighthouseApiKey && !fileCid && (
        <div className="mt-4 flex justify-center">
          <button onClick={uploadEncryptedFile} className="button">
            Upload to Lighthouse
          </button>
        </div>
      )}
    </div>
  );
};
