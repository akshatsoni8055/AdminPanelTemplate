import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";
const data = [
    { name: "Page A", uv: 300, pv: 1100, amt: 1200 },
    { name: "Page B", uv: 200, pv: 1200, amt: 1300 },
    { name: "Page C", uv: 400, pv: 2300, amt: 900 },
    { name: "Page D", uv: 100, pv: 1400, amt: 100 },
    { name: "Page E", uv: 200, pv: 1500, amt: 600 }
];

export default function App() {
   
    return (
        <LineChart width={600} height={300} data={data}>
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line yAxisId="second" type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="amt" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <YAxis yAxisId="second" />
            <YAxis yAxisId="right" orientation="right" />
        </LineChart>
    );
}