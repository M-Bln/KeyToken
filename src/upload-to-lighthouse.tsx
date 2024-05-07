import React, { useState } from 'react';
import lighthouse, { uploadEncrypted } from '@lighthouse-web3/sdk';
import { Buffer } from 'buffer';

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
  //const [authHeader, setAuthHeader] = useState<string | null>(null);

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
      <h2>Upload to lighthouse IPFS node</h2>
      You can upload the encrypted file with lighthouse. You then rely on a
      third party rather than having to run your own IPFS node. First you need
      to optain a Lighthouse API key ...., it only require to identify with
      metamask wallet.
      <label htmlFor="lighthouseApiKey">Lighthouse API Key:</label>
      <input
        type="text"
        id="lighthouseApiKey"
        onChange={(e) => setLighthouseApiKey(e.target.value)}
      />
      {lighthouseApiKey && !fileCid && (
        <div>
          <button onClick={uploadEncryptedFile}>upload to lighthouse</button>
        </div>
      )}
    </div>
  );
  //          {//fileCid && <div>File uploaded to lighthouse, visit at https://gateway.lighthouse.storage/ipfs/{fileCid}</div>}  {//fileCid && <div>File uploaded to lighthouse, visit at https://gateway.lighthouse.storage/ipfs/{fileCid}</div>}  {//fileCid && <div>File uploaded to lighthouse, visit at https://gateway.lighthouse.storage/ipfs/{fileCid}</div>}
};
