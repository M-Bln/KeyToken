import { ethers, Provider, Signer } from 'ethers';
import { createInstance, initFhevm } from 'fhevmjs/web';

export const FHE_LIB_ADDRESS = '0x000000000000000000000000000000000000005d';

export const createFhevmInstance = async (
  contractAddress: string,
  account: Signer,
  provider: Provider,
) => {
  const network = await provider.getNetwork();
  const chainId = +network.chainId.toString();
  const ret = await provider.call({
    // fhe lib address, may need to be changed depending on network
    to: '0x000000000000000000000000000000000000005d',
    // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    data: '0xd9d47bb001',
  });
  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(['bytes'], ret);
  const publicKey = decoded[0];
  await initFhevm(); // Load TFHE
  return createInstance({ chainId: chainId, publicKey });
};
