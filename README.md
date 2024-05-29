# KeyToken Web Application

KeyToken is a decentralized system that associates actual content with NFTs. Owning the NFT grants access to exclusive content such as music, films, or images. This means NFTs are no longer just abstract property titles, they now provide access to actual content, ensuring accessibility and exclusivity for the token holders.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Introduction

KeyToken enhances the value of NFTs by embedding confidential content within them. Only the holders of the token can access the associated content, ensuring exclusive access. The application interacts with the <a href="https://github.com/M-Bln/fhEVM-DRM">ConfidentialERC1155</a> smart contract, which is built on <a href="https://www.zama.ai/fhevm">fhEVM</a>, an extension of the Ethereum Virtual Machine (EVM) that enables fully homomorphic encryption (FHE) operations. The contract is deployed on <a href="https://docs.inco.org/getting-started/connect-metamask">Inco Gentry Testnet</a>

## Features

- **Confidential Content Access**: NFTs that grant access to encrypted content only to the token holders.
- **Integration with ConfidentialERC1155**: Utilizes the ConfidentialERC1155 smart contract for managing confidential data.
- **Decentralized Storage**: Uses IPFS for decentralized file storage.
- **Secure Encryption**: Employs AES-GCM encryption for securing content.

## Architecture

KeyToken works in conjunction with the ConfidentialERC1155 smart contract. This contract extends the standard ERC1155 by associating each token ID with confidential data, stored encrypted on the blockchain. The encrypted data is a 256-bit encryption key (for AES-GCM) which decrypts the confidential content stored on IPFS. The IPFS CID (Content Identifier) serves as the token ID in the ConfidentialERC1155 contract.

### Workflow

#### Connect wallet

1. **<a href="https://docs.inco.org/getting-started/connect-metamask">Add Inco Gentry Tesnet to your wallet</a>**
2. **Connect wallet to KeyToken**
3. **Create fhEVM instance**: You need to sign your reencryption public key to interract with fhEVM.

#### Upload and mint KeyToken

1. **Content Encryption**: Encrypt the content using AES-GCM.
2. **IPFS Upload**: Upload the encrypted content to IPFS and obtain the CID. You can either use your own IPFS node, you are then responsible for the availability of the content or a thrid party. KeyToken includes integration with <a href="https://www.lighthouse.storage">lighthouse</a>, you can obtain a limited storage lighthouse API key for free, by logging in using only a crypto wallet.
3. **Token Minting**: Mint a token with the ConfidentialERC1155 contract, it will be identified by the encrypted file CID.
4. **Token Distribution**: Distribute or sell the token as you would with any ERC1155 token. Holders of the token are granted access to the decryption key of the file identified by the CID / token ID.

#### Download and decrypt

Token holders can decrypt and access the confidential content by connecting their wallet and filling in the CID.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

Clone the repository and install the dependencies:

```sh
git clone https://github.com/M-Bln/KeyToken.git
cd keytoken
npm install
```

### Usage

To build the project:

```sh
npm run build
```

To test the application locally:

```sh
npm start
```

## Configuration

The user might want to deploy their own ConfidentialERC1155 smart contract and update the contract address in the application configuration file.

1. **Deploy ConfidentialERC1155**: Follow the instructions in the [ConfidentialERC1155 repository](https://github.com/yourusername/ConfidentialERC1155).
2. **Update Address**: Modify the smart contract address in the application configuration file to point to your deployed instance.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Note**: For more details on the ConfidentialERC1155 smart contract and its functionalities, refer to the [ConfidentialERC1155 project repository](https://github.com/yourusername/ConfidentialERC1155).

```

Feel free to customize the links and repository names as needed. This template should provide a clear and professional structure for your KeyToken web application project.
```
