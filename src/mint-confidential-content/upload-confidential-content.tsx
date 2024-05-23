// import { FhevmInstance } from 'fhevmjs';
// import React, { useCallback, useState } from 'react';

// import { DelegatedUpload } from './delegated-upload';
// import { EncryptFile } from './encrypt-file';
// import { MintConfidentialToken } from './mint-confidential-token';
// import { UploadToLighthouse } from './upload-to-lighthouse';

// interface UploadConfidentialContentProps {
//   instance: FhevmInstance;
// }

// export const UploadConfidentialContent: React.FC<
//   UploadConfidentialContentProps
// > = ({ instance }) => {
//   const [fileSelected, setFileSelected] = useState<boolean>(false);
//   const [file, setFile] = useState<Uint8Array>(new Uint8Array(0));
//   const [fileName, setFileName] = useState('');
//   const [fileCid, setFileCid] = useState<string | null>(null);
//   const [encryptedFile, setEncryptedFile] = useState<Uint8Array>(
//     new Uint8Array(0),
//   );
//   const [encryptionKey, setEncryptionKey] = useState<bigint | null>(null);
//   const handleFile = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const fileToUpload = e.target.files?.[0];
//       setFileName(fileToUpload?.name ?? '');
//       setEncryptionKey(null);
//       if (fileToUpload) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const arrayBuffer = reader.result as ArrayBuffer;
//           const fileAsUint8Array = new Uint8Array(arrayBuffer);
//           setFile(fileAsUint8Array);
//         };
//         reader.readAsArrayBuffer(fileToUpload);
//         setFileSelected(true);
//       }
//     },
//     [file],
//   );

//   return (
//     <div className="bg-red-500  flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold mb-4">Mint Confidential Content</h1>
//       <h2 className="text-2xl font-semibold mb-2">Encrypt content</h2>
//       <div className="mb-4">
//         Choose a file to encrypt and upload{' '}
//         <input
//           type="file"
//           onChange={handleFile}
//           className="border py-2 px-3 rounded"
//         />
//       </div>
//       {fileSelected && !encryptionKey && (
//         <EncryptFile
//           file={file}
//           setEncryptedFile={setEncryptedFile}
//           setEncryptionKey={setEncryptionKey}
//         />
//       )}
//       {encryptionKey !== null && (
//         <div className="mb-4">
//           The file {fileName} was encrypted with this private key:{' '}
//           {encryptionKey.toString(16)}
//         </div>
//       )}
//       <h2 className="text-2xl font-semibold mb-2">
//         Upload confidential content options
//       </h2>
//       <DelegatedUpload encryptedFile={encryptedFile} setFileCid={setFileCid} />
//       <UploadToLighthouse
//         encryptedFile={encryptedFile}
//         setFileCid={setFileCid}
//         fileCid={fileCid}
//       />
//       {fileCid && <div className="mb-4">Encrypted content CID: {fileCid}</div>}
//       <div>
//         <h2 className="text-2xl font-semibold mb-2">Mint Confidential Token</h2>
//         {fileCid === null &&
//           encryptionKey === null &&
//           'First encrypt the content and provide the CID'}
//         {fileCid && encryptionKey !== null && (
//           <MintConfidentialToken
//             instance={instance}
//             fileCid={fileCid}
//             contentEncryptionKey={encryptionKey}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

import { FhevmInstance } from 'fhevmjs';
import React, { useCallback, useState } from 'react';

import { DelegatedUpload } from './delegated-upload';
import { EncryptFile } from './encrypt-file';
import { MintConfidentialToken } from './mint-confidential-token';
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
    <div>
      <h1>Mint Confidential Content</h1>
      <h2>Encrypt content</h2>
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
      <h2>Upload confidential content options</h2>
      <DelegatedUpload encryptedFile={encryptedFile} setFileCid={setFileCid} />
      <UploadToLighthouse
        encryptedFile={encryptedFile}
        setFileCid={setFileCid}
        fileCid={fileCid}
      />
      {fileCid && <div>Encrypted content CID: {fileCid}</div>}
      <div>
        <h2>Mint Confidential Token</h2>
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
      </div>
    </div>
  );
  //            {!authHeader && <Web3Auth provider={provider} signer={signer} setAuthHeader={setAuthHeader}/>}
  // {authHeader && <UploadToCrustIpfs encryptedFile = {encryptedFile} authHeader={authHeader} />}
};
