import React, { useState, useCallback } from "react";
import { ethers } from "ethers";
import { Web3Auth } from "./web3-auth";
import { EncryptFile } from "./encrypt-file";
import { UploadToCrustIpfs } from "./upload-to-crust-ipfs";
import { UploadToLighthouse } from "./upload-to-lighthouse";

interface ProviderSignerProps {
    provider: ethers.Provider;
    signer: ethers.Signer;
}

export const UploadConfidentialContent : React.FC<ProviderSignerProps> = ({provider, signer}) => {
    const [authHeader, setAuthHeader] = useState<string | null>(null);
    const [fileSelected, setFileSelected] = useState<boolean>(false);
    const [file, setFile] = useState<Uint8Array>(new Uint8Array(0));
    const [encryptedFile, setEncryptedFile] = useState<Uint8Array>(new Uint8Array(0));
    const [encryptionKey, setEncryptionKey] = useState<string | null>(null);
    const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const fileToUpload = e.target.files?.[0];
        
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

    }, [file])
    return (
        <div>
            <div>Choose a file to encrypt and upload <input type="file" onChange={handleFile} /></div>
            {fileSelected && !encryptionKey && <EncryptFile file={file} setEncryptedFile={setEncryptedFile} setEncryptionKey={setEncryptionKey}/>}
            {encryptionKey && <div>Encryption key: {encryptionKey}</div>}
            <UploadToLighthouse encryptedFile = {encryptedFile} />
            {!authHeader && <Web3Auth provider={provider} signer={signer} setAuthHeader={setAuthHeader}/>}
            {authHeader && <UploadToCrustIpfs encryptedFile = {encryptedFile} authHeader={authHeader} />}

        </div>
    )
}