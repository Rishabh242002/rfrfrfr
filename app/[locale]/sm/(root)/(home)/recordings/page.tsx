import CallList from '@/components/CallListscientific'
import ProtectedPagesm from '@/components/Protectedpagesm'
import React from 'react'

export default function Recordings() {
  return (
    <ProtectedPagesm>
    <section className="flex size-full flex-col gap-10 text-white">
      
            <h1 className="text-3xl font-extrabold ">Recordings</h1>
            
      <CallList type='recordings' />
      
    </section>
  </ProtectedPagesm>
  )
}
