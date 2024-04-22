import React, { useState, useCallback } from "react";
import { ethers } from "ethers";
import { create, globSource } from 'ipfs-http-client';
import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { Configuration, RemotePinningServiceClient } from '@ipfs-shipyard/pinning-service-client';
import { createRemotePinner } from '@helia/remote-pinning';


interface Web3AuthProps {
    provider: ethers.Provider;
    signer: ethers.Signer;
}

export const Web3Auth : React.FC<Web3AuthProps> = ({provider, signer}) => {
    const [authHeader, setAuthHeader] = useState<string | null>(null);
    const [fileSelected, setFileSelected] = useState<boolean>(false);
    const [file, setFile] = useState<Uint8Array>(new Uint8Array(0));

    const signWeb3Auth = async () => {
        const address = await signer.getAddress();
        console.log("address: ", address);
        const signature = await signer.signMessage(address);
        console.log("signature: ", signature);
        setAuthHeader(`eth-${address}:${signature}`);
        console.log("authHeader: ", `eth-${address}:${signature}`);
        console.log("file: ", file);
        //const newAuthHeader = Buffer.from(`eth-${address}:${signature}`).toString('base64');
        console.log("eth: ", Buffer.from(`eth-${address}:${signature}`).toString('base64'));
        console.log("     ", 'ZXRoLTB4ZjBhNWI1MzJmYzJhNWQ4ZTMyNGNjMmQ3YzYxZGJmZGMxMDBkMzkxZToweGIzMjBmNjRiZDM1NjExNzE0NmQzMGU2ZjkwZjNiYzMzNWIyYjU5N2JiNDMzODJiYWM0OWI3ZDgyMDk5ZGYxMTQwYjBmNzhiODY3NjM1M2QwMzU0MTE2NDdlYzM0OGI0MTIwMDM3ZTliMTQ2MTBkMGNjY2ZmMDkwMDUzOWRkMWVkMWM=')
        console.log("sub: ", Buffer.from(`sub-${address}:${signature}`).toString('base64'));
        console.log("     ", 'ZXRoLTB4ZjBhNWI1MzJmYzJhNWQ4ZTMyNGNjMmQ3YzYxZGJmZGMxMDBkMzkxZToweGIzMjBmNjRiZDM1NjExNzE0NmQzMGU2ZjkwZjNiYzMzNWIyYjU5N2JiNDMzODJiYWM0OWI3ZDgyMDk5ZGYxMTQwYjBmNzhiODY3NjM1M2QwMzU0MTE2NDdlYzM0OGI0MTIwMDM3ZTliMTQ2MTBkMGNjY2ZmMDkwMDUzOWRkMWVkMWM=')
        console.log("sol: ", Buffer.from(`sol-${address}:${signature}`).toString('base64')); 
        // IPFS Web3 Authed Gateway address
        const ipfsGateway = 'https://crustipfs.xyz'
        // const ipfsGateway = 'https://cors-anywhere.herokuapp.com/https://crustipfs.xyz'

        console.log("authHeader: ", Buffer.from(`eth-${address}:${signature}`).toString('base64'));
        // 3. Create ipfs http client
        const ipfs = create({
            url: ipfsGateway + '/api/v0',
            headers: {
                authorization: 'Basic ' + Buffer.from(`eth-${address}:${signature}`).toString('base64')
            }
        });
        try {
            const { cid } = await ipfs.add(file);
            if (cid) {
                console.log('cid link: ', cid.link());
                console.log('cid toString: ', cid.toString());
                console.log(cid.toV0().toString());
            } else {
                throw new Error('IPFS add failed, please try again.');
            }
        } catch (error) {
            console.error(error);
        }

        // const helia = await createHelia();
        // const fs = unixfs(helia);
        // const cid = await fs.addBytes(file)


        // const pinServiceConfig = new Configuration({
        //     endpointUrl: ipfsGateway, // the URI for your pinning provider, e.g. `http://localhost:3000`
        //     accessToken: authHeader?authHeader:"" // the secret token/key given to you by your pinning provider
        // });

        // const remotePinningClient = new RemotePinningServiceClient(pinServiceConfig);
        // const remotePinner = createRemotePinner(helia, remotePinningClient);

        // //const { cid } = await ipfs.add(globSource('/home/mlnd42/Téléchargements/test_dir', 'test-file.txt'));

        // if (cid) {
        //     console.log('cid link: ', cid.link());
        //     console.log('cid toString: ', cid.toString());
        //     console.log('cid to V1: ', cid.toV1());
        //     const addPinResult = await remotePinner.addPin({
        //     cid,
        //     name: 'helloWorld'
        //     })
        // } else {
        //     throw new Error('IPFS add failed, please try again.');
        // }

    }
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

    return(
        <div>
            {!fileSelected && <input type="file" onChange={handleFile} required/>}
            {fileSelected && !authHeader && <button onClick={signWeb3Auth}>sign Web3 Authentification</button>}
            {authHeader && <div>Web3 Authentification header: {authHeader}</div>}
        </div>
    )
}

// ZXRoLTB4ZjBBNUI1MzJmYzJBNUQ4RTMyNENjMkQ3YzYxREJGZEMxMDBEMzkxZToweGJjZWE5MWNhZDZiZTE4NDM3OGM4NWYxZTI1ZGNhNmVlOTliYzY0NzdmODUzNWIwMTJkOTk5MzFhNzczN2I2MjI1M2RlNzkzYjU3Y2RjNjVmNGFkMDY4MzFjNzIwMmUwZDNlZGI1YzQwZjVhYzRkODljOTQ0Mzc2YTA2OTFmNjU0MWM
// ZXRoLTB4ZjBhNWI1MzJmYzJhNWQ4ZTMyNGNjMmQ3YzYxZGJmZGMxMDBkMzkxZToweGIzMjBmNjRiZDM1NjExNzE0NmQzMGU2ZjkwZjNiYzMzNWIyYjU5N2JiNDMzODJiYWM0OWI3ZDgyMDk5ZGYxMTQwYjBmNzhiODY3NjM1M2QwMzU0MTE2NDdlYzM0OGI0MTIwMDM3ZTliMTQ2MTBkMGNjY2ZmMDkwMDUzOWRkMWVkMWM=