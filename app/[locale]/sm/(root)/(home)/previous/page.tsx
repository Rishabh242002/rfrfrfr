import React from 'react'
import CallList from '@/components/CallListscientific'
import ProtectedPagesm from '@/components/Protectedpagesm'
export default function Previous() {
  return (
    <ProtectedPagesm>
    <section className="flex size-full flex-col gap-10 text-white">
      
    <h1 className="text-3xl font-extrabold ">Previous</h1>
    
    <CallList type='ended'/>
</section>
 </ProtectedPagesm> 
 )
}
