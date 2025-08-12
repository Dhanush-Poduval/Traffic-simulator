"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

function IntersectionCard({ signalName }) {
  const [carAmount, setCarAmount] = useState();
  const [signal, setSignal] = useState();
  const intervalRef = useRef(null);
  const [chart, setChart] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/details/${signalName}`);
      const data = await res.json();
      setCarAmount(data.car_amount);
      setSignal(data.signal === "Green" ? "🟢" : "🔴");
      setChart((prev) => {
        const updated = [...prev, { time: new Date().toLocaleTimeString(), cars: data.car_amount }];
        return updated.slice(-10);
      });
    } catch {
      console.log("Something went wrong mate");
    }
  };

  const signal_red = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/signal/${signalName}/red`, { method: "POST" });
      await fetchDetails();
    } catch {
      console.log("Something went wrong");
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const signal_green = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/signal/${signalName}/green`, { method: "POST" });
      await fetchDetails();
    } catch {
      console.log("Something went wrong");
    }
    if (!intervalRef.current) {
      intervalRef.current = setInterval(async () => {
        await fetch(`http://127.0.0.1:8000/intersection/${signalName}`, { method: "POST" });
        await fetchDetails();
      }, 3000);
    }
  };

  useEffect(() => {
    fetchDetails();
    const interval = setInterval(fetchDetails, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl backdrop-blur-md p-4 hover:shadow-purple-500/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white text-center">{signalName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
            <XAxis dataKey="time" stroke="#aaa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "none", color: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="cars"
              stroke="#8b5cf6"
              fill="url(#colorCars)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorCars" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Card className="bg-gray-800/80 border border-gray-700 rounded-lg flex flex-col items-center p-4">
            <p className="text-4xl text-white font-bold">{carAmount ?? "--"}</p>
            <div
              className={`mt-2 text-3xl ${
                signal === "🟢" ? "drop-shadow-[0_0_8px_#22c55e]" : "drop-shadow-[0_0_8px_#ef4444]"
              }`}
            >
              {signal}
            </div>
          </Card>
          <Card className="bg-gray-800/80 border border-gray-700 rounded-lg flex flex-col items-center p-4 gap-2">
            <p className="text-sm text-white font-medium">Change Signal</p>
            <Button onClick={signal_green} variant="secondary" className="w-full hover:bg-green-500/20">
              Green
            </Button>
            <Button onClick={signal_red} variant="destructive" className="w-full">
              Red
            </Button>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TrafficVisualizer() {
  const signals = ["Signal_A", "Signal_B", "Signal_C", "Signal_D"];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-white mb-10 tracking-tight">
        Traffic Visualizer
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {signals.map((signal) => (
          <IntersectionCard key={signal} signalName={signal} />
        ))}
      </div>
    </div>
  );
}
