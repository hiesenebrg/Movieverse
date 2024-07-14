import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';

const GaugeBar = () => {
  const currentMovie = useSelector((state) => state.movies.currentMovie);
  const RADIAN = Math.PI / 180;
  const data = [
    { name: 'A', value: 80, color: '#6161d4' },
    { name: 'B', value: 45, color: '#4646e3' },
    { name: 'C', value: 25, color: '#080894' },
  ];
  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;
  const value = currentMovie?.vote_average * 12;

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
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
  };

  return (
    <div className='p-4 border border-1-slate-200 w-fit h-fit'>
      <PieChart width={260} height={200} className='mt-[-80px] ml-[-60px]'>
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
        {needle(value, data, cx, cy, iR, oR, '#0d0a01')}
      </PieChart>
      <div className='w-full flex justify-center mt-4'>
        Rating
      </div>
    </div>
  );
};

export default GaugeBar;
