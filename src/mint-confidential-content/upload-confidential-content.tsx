import { FhevmInstance } from 'fhevmjs';
import React, { useCallback, useState } from 'react';

import { DelegatedUpload } from './delegated-upload';
import { EncryptFile } from './encrypt-file';
import { MintConfidentialToken } from './mint-confidential-token';
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
    <div className="white-rounded">
      <h1 className="h1">Mint Confidential Content</h1>
      <Step title="1st step, Encrypt content">
        <div>
          Choose a file to encrypt and upload{' '}
          <input type="file" onChange={handleFile} />
        </div>
        {fileSelected && !encryptionKey && (
          <EncryptFile
            file={file}
            setEncryptedFile={setEncryptedFile}
            setEncryptionKey={setEncryptionKey}
          />
        )}
        {encryptionKey !== null && (
          <div>
            The file {fileName} was encrypted with this private key:{' '}
            {encryptionKey.toString(16)}
          </div>
        )}
      </Step>

      <Step title="2nd step, Upload confidential content options">
        <DelegatedUpload
          encryptedFile={encryptedFile}
          setFileCid={setFileCid}
        />
        <UploadToLighthouse
          encryptedFile={encryptedFile}
          setFileCid={setFileCid}
          fileCid={fileCid}
        />
        {fileCid && <div>Encrypted content CID: {fileCid}</div>}
      </Step>

      <Step title="3nd step, Mint Key Token">
        {fileCid === null &&
          encryptionKey === null &&
          'First encrypt the content and provide the CID'}
        {fileCid && encryptionKey !== null && (
          <MintConfidentialToken
            instance={instance}
            fileCid={fileCid}
            contentEncryptionKey={encryptionKey}
          />
        )}
      </Step>
    </div>
  );
};
