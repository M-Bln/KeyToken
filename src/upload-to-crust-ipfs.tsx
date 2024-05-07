import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

interface UploadToCrustIpfsProps {
  encryptedFile: Uint8Array;
  authHeader: string;
}

export const UploadToCrustIpfs: React.FC<UploadToCrustIpfsProps> = ({
  encryptedFile,
  authHeader,
}) => {
  const [fileCid, setFileCid] = useState<string | null>(null);
  //const [authHeader, setAuthHeader] = useState<string | null>(null);

  const uploadToCrustIpfs = async () => {
    // IPFS Web3 Authed Gateway address
    const ipfsGateway = 'https://crustipfs.xyz';

    const ipfs = create({
      url: ipfsGateway + '/api/v0',
      headers: {
        authorization: 'Basic ' + authHeader,
      },
    });
    try {
      const { cid } = await ipfs.add(encryptedFile);
      if (cid) {
        setFileCid(cid.toString());
        console.log('cid link: ', cid.link());
        console.log('cid toString: ', cid.toString());
        console.log(cid.toV0().toString());
      } else {
        throw new Error('IPFS add failed, please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!fileCid && (
        <div>
          You can upload the encrypted file to crustipfs.xyz gateway. You then
          rely on a third party rather than having to run a local ipfs node.
          <button onClick={uploadToCrustIpfs}>upload to crustipfs.xyz</button>
        </div>
      )}
      {fileCid && <div>File uploaded to Crust IPFS with CID: {fileCid}</div>}
    </div>
  );
};
