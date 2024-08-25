import CallList from '@/components/CallList'
import ProtectedPageeco from '@/components/Protectedpageeco'
import React from 'react'

export default function Recordings() {
  return (
    <ProtectedPageeco>
    <section className="flex size-full flex-col gap-10 text-white">
      
            <h1 className="text-3xl font-extrabold ">Recordings</h1>
            
      <CallList type='recordings' />
      
    </section>
    </ProtectedPageeco>
  )
}
