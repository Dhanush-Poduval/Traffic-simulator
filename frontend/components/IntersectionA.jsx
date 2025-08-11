"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

export default function IntersectionA() {
  const [chartData, setChartData] = useState([]);
  const [carsCount, setCarsCount] = useState(0);
  const [signalStatus, setSignalStatus] = useState("🟢");

  // Backend endpoint
  const BACKEND_URL = "http://localhost:8000/details";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();

        // Find Signal A in the list
        const signalA = data.find((item) => item.intersection_name === "Signal A");

        if (signalA) {
          setCarsCount(signalA.car_amount);
          setSignalStatus(signalA.signal === "Green" ? "🟢" : "🔴");

          // Append new datapoint to chart
          setChartData((prev) => {
            const newData = [
              ...prev,
              {
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                cars: signalA.car_amount,
              },
            ];
            return newData.slice(-10); // Keep last 10 points
          });
        }
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // refresh every 2s
    return () => clearInterval(interval);
  }, []);

  const items = ["Amount of Cars", "Signal"];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-center tracking-tight text-white">
          Intersection A
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
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
        {items.map((value, index) => (
          <Card
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-100">
                {value}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white ${
                  value === "Amount of Cars"
                    ? "bg-gray-700"
                    : signalStatus === "🟢"
                    ? "bg-green-500 shadow-lg shadow-green-500/50"
                    : "bg-red-500 shadow-lg shadow-red-500/50"
                }`}
              >
                {value === "Amount of Cars" ? carsCount : signalStatus}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
