import React, { useState, useCallback } from "react";

interface FileProps {
    file: Uint8Array;
    setEncryptedFile: (encryptedFile: Uint8Array) => void;
    setEncryptionKey: (encryptionKey: string) => void;
}

export const EncryptFile: React.FC<FileProps> = ({file, setEncryptedFile, setEncryptionKey}) => {
    const encryptFile = useCallback(async () => {
        // Generate a random encryption key
        const key = window.crypto.getRandomValues(new Uint8Array(32));
        const keyString = Array.from(key).map(b => b.toString(16).padStart(2, '0')).join('');
        setEncryptionKey(keyString);

        // Encrypt the file
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const cryptoKey = await window.crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt']);
        const encryptedFile = await window.crypto.subtle.encrypt({name: 'AES-GCM', iv: iv}, cryptoKey, file);
        setEncryptedFile(new Uint8Array(encryptedFile));
    }, [file, setEncryptedFile, setEncryptionKey]);

    return(
        <button onClick={encryptFile}>Encrypt file</button>
    )
}