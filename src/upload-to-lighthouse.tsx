import React, { useState } from "react";
import lighthouse, { uploadEncrypted } from '@lighthouse-web3/sdk'
import { Buffer } from "buffer";

interface UploadToLighthouseProps {
    encryptedFile: Uint8Array;
}

export const UploadToLighthouse : React.FC<UploadToLighthouseProps> = ({encryptedFile}) => {
    const [fileCid, setFileCid] = useState<string | null>(null);
    const [lighthouseApiKey, setLighthouseApiKey] = useState<string | null>(null);
    //const [authHeader, setAuthHeader] = useState<string | null>(null);


        // const progressCallback = (progressData) => {
        //     let percentageDone =
        //       100 - (progressData.total / progressData.uploaded)?.toFixed(2)
        //     console.log(percentageDone)
        //   }
        function createFileList(file: File) {
          return {
              length: 1,
              item: (index : number) => file,
              0: file,
              // Add properties for all other files similarly
          };
      }
        
          const uploadEncryptedFile = async() =>{
            // Push file to lighthouse node
            // Both file and folder are supported by upload function
            // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
            // Fourth parameter is the deal parameters, default null
            if (lighthouseApiKey) {
                console.log('Uploading encrypted file to lighthouse');
                console.log('Encrypted File:', encryptedFile);
                const blob = new Blob([encryptedFile], { type: 'application/octet-stream' });
                const file = new File([blob], 'encrypted-file.txt');
                const fileList = createFileList(file);
                const buffer = encryptedFile.buffer;
                console.log('Encrypted File Buffer:', buffer);
                const output = await lighthouse.upload(fileList, lighthouseApiKey, false, undefined);
                console.log('File Status:', output);
                console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
                setFileCid(output.data.Hash);
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
        

          }

    return(
        <div>
                <label htmlFor="lighthouseApiKey">Lighthouse API Key:</label>
        <input 
            type="text" 
            id="lighthouseApiKey"  
            onChange={e => setLighthouseApiKey(e.target.value)} 
        />
        {lighthouseApiKey && !fileCid && 
            <div>     
                You can upload the encrypted file with lighthouse. You then rely on a third party rather than having to run a local ipfs node.
                <button onClick={uploadEncryptedFile}>upload to lighthouse</button>
            </div> }
        {fileCid && <div>File uploaded to lighthouse, visit at https://gateway.lighthouse.storage/ipfs/{fileCid}</div>}
        </div>
    )
}