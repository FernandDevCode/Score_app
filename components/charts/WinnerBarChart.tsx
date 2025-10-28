
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface WinnerBarChartProps {
  home: number;
  draw: number;
  away: number;
  homeTeam: string;
  awayTeam: string;
}

const WinnerBarChart: React.FC<WinnerBarChartProps> = ({ home, draw, away, homeTeam, awayTeam }) => {
  const data = [
    { name: homeTeam, value: home, color: '#3b82f6' },
    { name: 'Draw', value: draw, color: '#a8a29e' },
    { name: awayTeam, value: away, color: '#ef4444' },
  ];
  
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text x={x + width / 2} y={y - 6} fill="#e2e8f0" textAnchor="middle" dominantBaseline="middle" className="font-bold">
        {`${value}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
        <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
        <Tooltip
            cursor={{fill: 'rgba(255,255,255,0.1)'}}
            contentStyle={{
                background: 'rgba(30, 41, 59, 0.9)',
                borderColor: '#475569',
                borderRadius: '0.5rem',
                color: '#f1f5f9'
            }}
            formatter={(value: number) => [`${value}%`, 'Probability']}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          <LabelList dataKey="value" position="top" content={renderCustomizedLabel} />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WinnerBarChart;
