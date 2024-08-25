import CallList from '@/components/CallList'
import ProtectedPagepcsvt from '@/components/Protectedpagepcsvt'
import React from 'react'

export default function Recordings() {
  return (
    <ProtectedPagepcsvt>
    <section className="flex size-full flex-col gap-10 text-white">
      
            <h1 className="text-3xl font-extrabold ">Recordings</h1>
            
      <CallList type='recordings' />
      
    </section>
  </ProtectedPagepcsvt> 
  )
}
