import React, { useState } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { decryptFile } from "@lighthouse-web3/sdk";
import DownloadLink from "react-download-link";
import { AccessConfidentialData } from "./access-confidential-data";
import { FhevmInstance } from "fhevmjs";

interface AccessConfidentialContentProps {
    instance: FhevmInstance;
    signerAddress: string;
    token: { publicKey: Uint8Array; signature: string } ;
}

export const AccessConfidentialContent : React.FC<AccessConfidentialContentProps> = ({instance, signerAddress, token}) => {
    const [tokenId, setTokenId] = useState<string | null >(null)
    const [cid, setCid] = useState<string | null >(null)
    const [encryptedFile, setEncryptedFile] = useState<Uint8Array | null>(null);
    const [clearFile, setClearFile] = useState<Uint8Array>(new Uint8Array(0));
    const [encryptionKey, setEncryptionKey] = useState<string>("");

    // const loadEncryptedFile = async() => {
    //     if (cid) {
    //     try {
    //             const client = create({url: 'https://gateway.moralisipfs.com/ipfs/'});
    //             const stream = client.cat(cid);
    //             let data = new Uint8Array(0);
    
    //             for await (const chunk of stream) {
    //                 let tmp = new Uint8Array(data.byteLength + chunk.length);
    //                 tmp.set(data, 0);
    //                 tmp.set(chunk, data.byteLength);
    //                 data = tmp;
    //             }
    
    //             console.log('data: ', data);
    //             setEncryptedFile(data);
    //         } catch (error) {  
    //             console.error('Error fetching encrypted file', error);
    //         }
    //     }
    // }

    const loadEncryptedFile = async() => {
        try {
            const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
            console.log('response: ', response);
            const data = await response.arrayBuffer();
            console.log('data: ', data);
            const fileAsUint8Array = new Uint8Array(data);
            console.log('file as Uint8Array: ', fileAsUint8Array);
            setEncryptedFile(fileAsUint8Array);
        } catch (error) {  
            console.error('Error fetching encrypted file', error);
        }
    }

    const decryptFile = async() => {
        console.log('encrypted file: ', encryptedFile);
        console.log('encryption key: ', encryptionKey);
        if (encryptedFile && encryptionKey.length > 0) {
            // Convert the encryption key back to a Uint8Array
            const key = new Uint8Array((encryptionKey.match(/.{1,2}/g) || []).map(byte => parseInt(byte, 16)));
            console.log('get key: ', key);
            // Decrypt the file
            const iv = encryptedFile.slice(0, 12); // Assuming the iv is the first 12 bytes of the encrypted file
            console.log('get iv: ', iv);
            const data = encryptedFile.slice(12);
            console.log('get encrypted data: ', data);
            const cryptoKey = await window.crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['decrypt']);
            const decryptedFile = await window.crypto.subtle.decrypt({name: 'AES-GCM', iv: iv}, cryptoKey, data);
            const decryptedFileAsUint8Array = new Uint8Array(decryptedFile);
            console.log('decrypted file: ', decryptedFileAsUint8Array);
            // Convert the decrypted file to a Uint8Array and set the clearFile state
            setClearFile(decryptedFileAsUint8Array);

            // Create a Blob from the decrypted file
            const blob = new Blob([decryptedFileAsUint8Array]);

            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);

            // Create a link element
            const link = document.createElement('a');

            // Set the link's href to the Blob URL
            link.href = url;

            // Set the download attribute to the desired file name
            link.download = 'decrypted-file';

            // Append the link to the body
            document.body.appendChild(link);

            // Programmatically click the link to start the download
            link.click();

            // Remove the link from the body
            document.body.removeChild(link);
        }
    }

    return (
        <div>
            <h1>Access Confidential Content</h1>
            <label htmlFor="tokenId">token ID:</label>
        <input 
            type="text" 
            id="tokenId"  
            onChange={e => setTokenId(e.target.value)} 
        />
        <label htmlFor="encryptionKey">Encryption key:</label>
        <input 
            type="text" 
            id="encryptionKey"  
            onChange={e => setEncryptionKey(e.target.value)} 
        />
        <label htmlFor="tokenId">Confidential content CID:</label>
        <input 
            type="text" 
            id="CID"  
            onChange={e => setCid(e.target.value)} 
        />
        {cid && <button onClick={loadEncryptedFile}>
                    Load encrypted file
                </button>}
        {cid && encryptedFile && <AccessConfidentialData instance={instance} cid = {cid} token = {token} signerAddress={signerAddress} />}
        {/* {cid && <button onClick={getContentKey}> getContentKey </button>}
        {encryptedFile && encryptionKey !== "" && <button onClick={decryptFile}> Decrypt content  </button>} */}
        </div>
    )
}