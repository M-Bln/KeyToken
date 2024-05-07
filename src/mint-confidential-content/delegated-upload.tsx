import React from 'react';

interface DelegatedUploadProps {
  encryptedFile: Uint8Array;
  setFileCid: (fileCid: string) => void;
}

export const DelegatedUpload: React.FC<DelegatedUploadProps> = ({
  encryptedFile,
  setFileCid,
}) => {
  const downloadEncryptedFile = async () => {
    const blob = new Blob([encryptedFile]);

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set the link's href to the Blob URL
    link.href = url;

    // Set the download attribute to the desired file name
    link.download = 'encrypted-file';

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to start the download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };

  return (
    <div>
      <h3>First option: upload to your own IPFS node</h3>
      Manage yourself the storing of the content with IPFS. You are then
      responsible to make content available to users. <br />
      Download the encrypted file and upload it to your own IPFS node with
      version 0. See how to run an IPFS node at{' '}
      <a
        href="https://docs.ipfs.io/how-to/command-line-quick-start/"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://docs.ipfs.io/how-to/command-line-quick-start/
      </a>
      <br />
      <button onClick={downloadEncryptedFile}>
        {' '}
        Download encrypted file
      </button>{' '}
      <br />
      Put it on your own IPFS node and fill in the CID, it should start with Qm.
      <br />
      <label htmlFor="CID">CID: </label>
      <input
        type="text"
        id="CID"
        onChange={(e) => setFileCid(e.target.value)}
      />
    </div>
  );
};
