"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect , useRef } from "react";
import { Button } from "./ui/button";
const cars=[60,60,80,30];

export default function IntersectionA() {
  
  const [carAmount , setcarAmount]=useState()
  const[signal , setSignal]=useState()
  const intervalRef= useRef(null)


  const fetchDetails=async()=>{
    try{
      const res=await fetch("http://127.0.0.1:8000/details/Signal_A")
      const data = await res.json();
      setcarAmount(data.car_amount);
      setSignal(data.signal === "Green" ? "🟢" : "🔴");

    }catch(err){
      console.log("Something went wrong mate");
    }
   

   
  };
  useEffect(() => {
    fetchDetails();
  }, []);
   const signal_red=async()=>{
      try{
        await fetch('http://127.0.0.1:8000/signal/Signal_A/red',{
          method:'POST',
        })
        await fetchDetails();
        const res=await fetch("http://127.0.0.1:8000/details/Signal_A")
        const json = await res.json()
        setSignal(json.signal)
      }catch(err){
        console.log("Something went wrong")
      }
      if(intervalRef.current){
        clearInterval(intervalRef.current);
        intervalRef.current=null;
      }
    }
    const signal_green=async()=>{
      try{
        await fetch('http://127.0.0.1:8000/signal/Signal_A/green',{
          method:'POST',
        })
        
        const res=await fetch("http://127.0.0.1:8000/details/Signal_A")
        const json = await res.json()
        setSignal(json.signal)
        await fetchDetails();
      }catch(err){
        console.log("Something went wrong")
      }
      if(!intervalRef.current){
        intervalRef.current=setInterval(async()=>{
         await fetch("http://127.0.0.1:8000/intersection/Signal_A",{
          method:'POST'
         })
         await fetchDetails();
          const res= await fetch("http://127.0.0.1:8000/details/Signal_A")
          const json = await res.json()
          setcarAmount(json.car_amount)

        },3000);
      }
    }
  const items = ["Amount of Cars", "Signal"];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-center tracking-tight text-white">
          Intersection A
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={cars}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" stroke="#aaa" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="cars"
            stroke="#9333ea"
            fill="#c084fc"
            strokeWidth={2}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
       
          <Card
            
            className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-100">
                {carAmount}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white 
                 
                `}
              >
                {signal}
              </div>
            </CardContent>
          </Card>
          <Card
            
            className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-100">
                Signals(Tap to Change)
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white 
                 
                `}
              >
               <Button onClick={signal_green}>Green</Button>
               <Button onClick={signal_red}>Red</Button>
              </div>
            </CardContent>
          </Card>
       
      </div>
    </div>
  );
}
