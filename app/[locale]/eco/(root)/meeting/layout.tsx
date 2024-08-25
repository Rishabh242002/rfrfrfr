import React from 'react'

const Rootlayout = ({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) => {
  return (
    <main>
      
      {children}
      
    </main>
  )
}

export default Rootlayout
