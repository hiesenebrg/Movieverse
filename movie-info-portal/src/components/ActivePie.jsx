import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Sector } from "recharts";



export default function ActivePie() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentMovie = useSelector((state) => state.movies.currentMovie);
  const data = [
    { name: "Release", value: 400 ,values:currentMovie.release_date},
    { name: "Popularity", value: 300 ,values:currentMovie.popularity },
    { name: "Country", value: 300 ,values:currentMovie.origin_country[0]==='IN'? 'India' : 'USA' },
    { name: "Vote Count", value: 200 ,values:currentMovie.vote_count },
  ];
  
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
      values
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 8) * cos;
    const my = cy + (outerRadius + 14) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 5;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <text
        className="text-xs"
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${values}`}</text>
      </g>
    );
  };
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div>
      <PieChart width={300} height={198} className='text-sm border min-w-[20vw]  md:px-0 border-slate-200'>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={150}
          cy={100}
          innerRadius={40}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </div>
  );
}
