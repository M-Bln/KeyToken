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
  //const [fileCid, setFileCid] = useState<string | null>(null);
  const [lighthouseApiKey, setLighthouseApiKey] = useState<string | null>(null);
  //const [authHeader, setAuthHeader] = useState<string |null>(null);

  // const progressCallback = (progressData) => {
  //     let percentageDone =
  //       100 - (progressData.total / progressData.uploaded)?.toFixed(2)
  //     console.log(percentageDone)
  //   }
  function createFileList(file0: File, file1: File) {
    return {
      length: 2,
      item: (index: number) => (index == 0 ? file0 : file1),
      0: file0,
      1: file1,
      // Add properties for all other files similarly
    };
  }

  const uploadEncryptedFile = async () => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
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
    /*
              output:
                data: {
                  Name: "filename.txt",
                  Size: 88000,
                  Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
                }
              Note: Hash in response is CID.
            */
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
        <div className="mt-4">
          <button onClick={uploadEncryptedFile} className="button">
            Upload to Lighthouse
          </button>
        </div>
      )}
    </div>
    // <div>
    //   {/* <h3>Second option: upload to Lighthouse IPFS node</h3> */}
    //   Then you rely on a third party for storing and availability of content.
    //   Lightouse offers free limited storage. It requires only a crypto wallet to
    //   login and to obtain an API key at{' '}
    //   <a
    //     href="https://www.lighthouse.storage/"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Lighthouse Storage
    //   </a>
    //   <br />
    //   <label htmlFor="lighthouseApiKey">Lighthouse API Key:</label>
    //   <input
    //     type="text"
    //     id="lighthouseApiKey"
    //     onChange={(e) => setLighthouseApiKey(e.target.value)}
    //   />
    //   {lighthouseApiKey && !fileCid && (
    //     <div>
    //       <button onClick={uploadEncryptedFile}>upload to lighthouse</button>
    //     </div>
    //   )}
    //   You can then later buy storage on the FileCoin network for a decentralized
    //   approach.
    // </div>
  );
  //          {//fileCid && <div>File uploaded to lighthouse, visit at https://gateway.lighthouse.storage/ipfs/{fileCid}</div>}  {//fileCid && <div>File uploaded to lighthouse, visit at https://gateway.lighthouse.storage/ipfs/{fileCid}</div>}  {//fileCid && <div>File uploaded to lighthouse, visit at https://gateway.lighthouse.storage/ipfs/{fileCid}</div>}
};
