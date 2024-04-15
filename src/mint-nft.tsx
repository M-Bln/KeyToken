import * as React from 'react'
import { 
  type BaseError, 
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi'
import { abi } from './abi'
import { FhevmInstance } from 'fhevmjs';
 
interface MintNFTProps {
  instance: FhevmInstance | null;
}


export const MintNFT: React.FC<MintNFTProps> =({ instance }) => {
  const { 
    data: hash,
    error,   
    isPending, 
    writeContract 
  } = useWriteContract() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const tokenId = formData.get('tokenId') as string
    const address = formData.get('address') as string 
    const clearData = formData.get('data') as unknown as number
    const encryptedData = instance?.encrypt32(clearData)
    writeContract({
      address: '0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',
      abi,
      functionName: 'mintWithConfidentialData',
      args: [address, BigInt(tokenId), BigInt(1), '0x', encryptedData],
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <input name="tokenId" placeholder="42" required />
      <input name="data" placeholder="65" required/>
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Mint'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && ( 
        <div>Error: {(error as BaseError).shortMessage || error.message}</div> 
      )} 
    </form>
  )
}