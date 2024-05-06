import React, { useState, useCallback } from "react";

interface FileProps {
    file: Uint8Array;
    setEncryptedFile: (encryptedFile: Uint8Array) => void;
    setEncryptionKey: (encryptionKey: bigint) => void;
}

export const EncryptFile: React.FC<FileProps> = ({file, setEncryptedFile, setEncryptionKey}) => {
    const encryptFile = useCallback(async () => {
        // Generate a random encryption key
        const key = window.crypto.getRandomValues(new Uint8Array(32));
        console.log("set key:   ", key);
        const keyString = Array.from(key).map(b => b.toString(16).padStart(2, '0')).join('');
        console.log("set keyString:   ", keyString);
        setEncryptionKey(BigInt('0x'+keyString));

        // Encrypt the file
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        console.log("set iv:   ", iv);
        const cryptoKey = await window.crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt']);
        const encryptedData = await window.crypto.subtle.encrypt({name: 'AES-GCM', iv: iv}, cryptoKey, file);
        console.log("set encryptedData:   ", encryptedData);

        // Combine the iv and the encrypted data
        const encryptedFile = new Uint8Array(iv.length + encryptedData.byteLength);
        console.log("set encryptedFile:   ", encryptedFile);
        encryptedFile.set(new Uint8Array(iv));
        encryptedFile.set(new Uint8Array(encryptedData), iv.length);

        setEncryptedFile(new Uint8Array(encryptedFile));
    }, [file, setEncryptedFile, setEncryptionKey]);

    return(
        <button onClick={encryptFile}>Encrypt file</button>
    )
}