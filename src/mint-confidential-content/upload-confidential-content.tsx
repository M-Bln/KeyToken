import { FhevmInstance } from 'fhevmjs';
import React, { useCallback, useState } from 'react';

import { DelegatedUpload } from './delegated-upload';
import { EncryptFile } from './encrypt-file';
import { MintConfidentialToken } from './mint-confidential-token';
import Option from './option';
import Step from './step';
import { UploadToLighthouse } from './upload-to-lighthouse';

interface UploadConfidentialContentProps {
  instance: FhevmInstance;
}

export const UploadConfidentialContent: React.FC<
  UploadConfidentialContentProps
> = ({ instance }) => {
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [file, setFile] = useState<Uint8Array>(new Uint8Array(0));
  const [fileName, setFileName] = useState('');
  const [fileCid, setFileCid] = useState<string | null>(null);
  const [encryptedFile, setEncryptedFile] = useState<Uint8Array>(
    new Uint8Array(0),
  );
  const [encryptionKey, setEncryptionKey] = useState<bigint | null>(null);

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileToUpload = e.target.files?.[0];
      setFileName(fileToUpload?.name ?? '');
      setEncryptionKey(null);
      if (fileToUpload) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const fileAsUint8Array = new Uint8Array(arrayBuffer);
          setFile(fileAsUint8Array);
        };
        reader.readAsArrayBuffer(fileToUpload);
        setFileSelected(true);
      }
    },
    [file],
  );

  return (
    <div className="primary-light-rounded">
      <h1 className="h1 mb-12 border-b-2 border-primary-dark">
        Mint Confidential Content
      </h1>
      <Step title="1st step, Encrypt content">
        <div className="text-font-bold text-primary-dark mb-4 space-y-2">
          <label className="font-bold">
            Choose a file to encrypt and upload
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              onChange={handleFile}
              className="block flex-grow text-neutral-dark bg-neutral-light p-2 border border-neutral-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <EncryptFile
              file={file}
              setEncryptedFile={setEncryptedFile}
              setEncryptionKey={setEncryptionKey}
              fileSelected={fileSelected}
            />
          </div>
        </div>
        {encryptionKey !== null && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md text-gray-700">
            The file <strong>{fileName}</strong> was encrypted with this private
            key:
            <code className="block mt-2 text-sm text-gray-800 break-words">
              {encryptionKey.toString(16)}
            </code>
          </div>
        )}
      </Step>

      <Step title="2nd step, Upload confidential content">
        <Option title="1st option, Upload to your own IPFS node">
          <DelegatedUpload
            encryptedFile={encryptedFile}
            setFileCid={setFileCid}
          />
        </Option>
        <Option title="2nd option, Upload to Lighthouse IPFS node">
          <UploadToLighthouse
            encryptedFile={encryptedFile}
            setFileCid={setFileCid}
            fileCid={fileCid}
          />
          {fileCid && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md text-gray-700">
              Encrypted content CID:{' '}
              <code className="text-sm text-gray-800 break-words">
                {fileCid}
              </code>
            </div>
          )}
        </Option>
      </Step>

      <Step title="3rd step, Mint Key Token">
        <MintConfidentialToken
          instance={instance}
          fileCid={fileCid}
          contentEncryptionKey={encryptionKey}
        />
      </Step>
    </div>
  );
};
