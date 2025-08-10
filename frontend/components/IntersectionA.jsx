"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { time: "10:00", cars: 20 },
  { time: "10:05", cars: 0 },
  { time: "10:10", cars: 25 },
  { time: "10:15", cars: 0 },
  { time: "10:20", cars: 30 },
  { time: "10:25", cars: 0 },
];

export default function IntersectionA() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Intersection A</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Total Cars Processed</p>
            <p className="text-lg font-semibold">75 cars</p>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <CartesianGrid  vertical={false} />
            <XAxis dataKey="time" />
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
      </CardContent>
    </Card>
  );
}
