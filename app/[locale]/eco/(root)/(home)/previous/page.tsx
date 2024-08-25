import React from 'react'
import CallList from '@/components/CallList'
import ProtectedPageeco from '@/components/Protectedpageeco'
export default function Previous() {
  return (
    <ProtectedPageeco>
    <section className="flex size-full flex-col gap-10 text-white">
      
    <h1 className="text-3xl font-extrabold ">Previous</h1>
    
    <CallList type='ended'/>
    
</section>
</ProtectedPageeco>
  )
}
