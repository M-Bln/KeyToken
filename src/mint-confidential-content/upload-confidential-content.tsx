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
    <div className="white-rounded">
      {/* <h1 className="text-4xl font-bold text-gray-800 mb-6"> */}
      <h1 className="h1">Mint Confidential Content</h1>
      <Step title="1st step, Encrypt content">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Choose a file to encrypt and upload
          </label>
          <input
            type="file"
            onChange={handleFile}
            className="block w-full text-gray-600 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {fileSelected && !encryptionKey && (
          <EncryptFile
            file={file}
            setEncryptedFile={setEncryptedFile}
            setEncryptionKey={setEncryptionKey}
          />
        )}
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

      <Step title="2nd step, Upload confidential content options">
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
        {fileCid === null && encryptionKey === null && (
          <p className="text-gray-600">
            First encrypt the content and provide the CID
          </p>
        )}
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

// import { FhevmInstance } from 'fhevmjs';
// import React, { useCallback, useState } from 'react';

// import { DelegatedUpload } from './delegated-upload';
// import { EncryptFile } from './encrypt-file';
// import { MintConfidentialToken } from './mint-confidential-token';
// import Option from './option';
// import Step from './step';
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
//     <div className="white-rounded">
//       <h1 className="h1">Mint Confidential Content</h1>
//       <Step title="1st step, Encrypt content">
//         <div>
//           Choose a file to encrypt and upload{' '}
//           <input type="file" onChange={handleFile} />
//         </div>
//         {fileSelected && !encryptionKey && (
//           <EncryptFile
//             file={file}
//             setEncryptedFile={setEncryptedFile}
//             setEncryptionKey={setEncryptionKey}
//           />
//         )}
//         {encryptionKey !== null && (
//           <div>
//             The file {fileName} was encrypted with this private key:{' '}
//             {encryptionKey.toString(16)}
//           </div>
//         )}
//       </Step>

//       <Step title="2nd step, Upload confidential content options">
//         <Option title="1st option, Upload to your own IPFS node">
//           <DelegatedUpload
//             encryptedFile={encryptedFile}
//             setFileCid={setFileCid}
//           />
//         </Option>
//         <Option title="2nd option, Upload to Lighthouse IPFS node">
//           <UploadToLighthouse
//             encryptedFile={encryptedFile}
//             setFileCid={setFileCid}
//             fileCid={fileCid}
//           />
//           {fileCid && <div>Encrypted content CID: {fileCid}</div>}
//         </Option>
//       </Step>

//       <Step title="3rd step, Mint Key Token">
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
//       </Step>
//     </div>
//   );
// };
