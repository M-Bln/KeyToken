import React, { useState } from "react";
import lighthouse, { uploadEncrypted } from '@lighthouse-web3/sdk'

interface UploadToLighthouseProps {
    encryptedFile: Uint8Array;
}

export const UploadToLighthouse : React.FC<UploadToLighthouseProps> = ({encryptedFile}) => {
    const [fileCid, setFileCid] = useState<string | null>(null);
    const [lighthouseApiKey, setLighthouseApiKey] = useState<string | null>(null);
    //const [authHeader, setAuthHeader] = useState<string | null>(null);


        // const progressCallback = (progressData) => {
        //     let percentageDone =
        //       100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
        //     console.log(percentageDone)
        //   }
        
          const uploadEncryptedFile = async() =>{
            // Push file to lighthouse node
            // Both file and folder are supported by upload function
            // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
            // Fourth parameter is the deal parameters, default null
            if (lighthouseApiKey) {
                const output = await lighthouse.uploadBuffer(encryptedFile, lighthouseApiKey);
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