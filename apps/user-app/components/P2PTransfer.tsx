"use client"
import { useState } from "react";
import { p2ptrans } from "../app/lib/P2PTransaction";
// ../app/lib/P2PTransaction
const P2PTransfer: React.FC = () => {
    const [amount, setAmount] = useState('')
    const [number, setNumber] = useState('')
    return (
    
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-[#1a2029] text-center">
              P2P Money Transfer
            </h1>
            <p className="text-gray-600 text-center mt-2">
              Send money securely and instantly.
            </p>
            <form className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="recipient"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient
                </label>
                <input
                    onChange={(e)=>{
                        setNumber(e.target.value)

                    }}
                    type="text"
                    id="recipient"
                    placeholder="Enter recipient Number"
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9c86d9] focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                    onChange={(e)=>{
                        setAmount(e.target.value)
                    }}
                    type="number"
                    id="amount"
                    placeholder="Enter amount"
                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9c86d9] focus:border-transparent"
                />
              </div>
              <button
                onClick={ async ()=>{
                    await p2ptrans( number , Number(amount) * 100)
                }}
                className="w-full bg-[#1a2029] hover:bg-[#846ec4] text-white py-3 rounded-md transition duration-300"
              >
                <div className=" flex justify-center gap-5">
                    <div>
                        send
                    </div>
                    <div className=" -rotate-12">
                        <SendIcon/>
                    </div>
                </div>
                
              </button>
            </form>
          </div>
          <div className="bg-[#1a2029] text-white text-center py-3">
            <p className="text-sm">Secure & Trusted Payments</p>
          </div>
        </div>

    );
  };
  
  const SendIcon = ()=>{
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
  
  }
export default P2PTransfer