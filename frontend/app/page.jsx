'use client'
import IntersectionA from '@/components/IntersectionA'
import IntersectionB from '@/components/IntersectionB'
import IntersectionC from '@/components/IntersectionC'
import IntersectionD from '@/components/IntersectionD'
import React, { useEffect, useRef, useState } from 'react'





export default function page() {
  const interval =useRef(null);
  
  const fetchData=async()=>{
  try{
    await fetch('http://127.0.0.1:8000/intersection',{
      method:'POST',
    })
    
     
  }catch(err){
    console.log("Error fetching mate");

  }
}
const startFetch=async()=>{
  if(interval.current)return
  interval.current = setInterval(fetchData, 2000)
}
const stopfetch=async()=>{
    clearInterval(interval.current)
    interval.current = null
    console.log("Stopped fetching basic mate");
}
  useEffect(()=>{
    
    
    return()=>clearInterval(interval.current);

  },[])

  
  return (
    <div>
       <button onClick={startFetch}>Start</button>
      <button onClick={stopfetch}>Stop</button>
      <div className='grid grid-cols-1 lg:grid-col-2 2xl:grid-cols-2 gap-10 max-w-full'>
        
          <div className='bg-primary-foreground p-4 rounded-lg max-h-[700px]'><IntersectionA /></div>
          <div className='bg-primary-foreground  p-4 rounded-lg'><IntersectionB /></div>
          <div className='bg-primary-foreground  p-4 rounded-lg'><IntersectionC /></div>
          <div className='bg-primary-foreground  p-4 rounded-lg'><IntersectionD /></div>
        
        
          
        
          
      </div>

    </div>

  )
}
