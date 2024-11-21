import React from 'react'
import P2PTransfer from '../../../components/P2PTransfer'
import TransactoinP2P from '../../../components/TransactoinP2P'

const page = () => {
  
  return (
    <div className='w-full'>
        <div className="p-6 bg-gray-200 min-h-screen gap-2 flex flex-col lg:flex-row items-center justify-around ">
          <P2PTransfer/>
          <TransactoinP2P/>
        </div>
      
    </div>
  )
}




export default page
