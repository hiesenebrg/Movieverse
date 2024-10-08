import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell } from "recharts";

const GaugeBar = ({ type }) => {
  const currentMovie = useSelector((state) => state.movies.currentMovie);
  console.log("ssss" ,typeof currentMovie?.Ratings[0]?.Value.split("/")[0]);

  const RADIAN = Math.PI / 180;
  const data = [
    { name: "A", value: 80, color: type === "rating" ? `#6161d4` : `#d46161` },
    { name: "B", value: 45, color: type === "rating" ? "#4646e3" : `#b92626` },
    { name: "C", value: 25, color: type === "rating" ? "#050551" : `#890606` },
  ];
  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;
  const value =
    type === "Internet Movie Database"
      ? parseInt(currentMovie?.Ratings[0] ? currentMovie?.Ratings[0]?.Value.split("/")[0]:"4") * 12
      : parseInt(currentMovie?.Ratings[1] ? currentMovie?.Ratings[1]?.Value.split("%")[0]:"40") * 1.5;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />,
    ];
  };

  return (
    <div className="xs:px-12 xs:py-4 md:p-4 border border-1-slate-200 w-fit h-fit">
      <PieChart width={260} height={200} className="mt-[-80px] ml-[-60px]">
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, "#0d0a01")}
      </PieChart>
      <div className="w-full flex justify-center mt-4">
        {type === "Internet Movie Database"
          ? `IMDB - ${currentMovie?.Ratings[0] ? currentMovie?.Ratings[0]?.Value.split("/")[0] : 4}`
          : `Rotten Tomatoes - ${currentMovie?.Ratings[1] ? currentMovie?.Ratings[1]?.Value.split("/")[0] : '40%'}`}
      </div>
    </div>
  );
};

export default GaugeBar;
