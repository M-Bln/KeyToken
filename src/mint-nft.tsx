import * as React from 'react'
import { 
  type BaseError, 
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi'
import { abi } from './abi'
 
export function MintNFT() {
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
    writeContract({
      address: '0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',
      abi,
      functionName: 'mintWithConfidentialData',
      args: ['0xF9daEB8451D1d88CB5E160C732fE9E5D5455b241', BigInt(tokenId), BigInt(1), '0x', '0x'],
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