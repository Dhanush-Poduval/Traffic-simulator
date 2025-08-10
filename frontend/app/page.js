import IntersectionA from '@/components/IntersectionA'
import React from 'react'

export default function page() {
  return (
   <div className='grid grid-cols-1 lg:grid-col-2 2xl:grid-cols-2 gap-4'>
      <div className='bg-primary-foreground p-4 rounded-lg '><IntersectionA/></div>
      <div className='bg-primary-foreground  p-4 rounded-lg'>test</div>
      <div className='bg-primary-foreground  p-4 rounded-lg'>test</div>
      <div className='bg-primary-foreground  p-4 rounded-lg'>test</div>
      
      
      
     
      
    </div>
  )
}
