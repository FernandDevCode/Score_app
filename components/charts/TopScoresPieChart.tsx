
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TopScore } from '../../types';

interface TopScoresPieChartProps {
  data: TopScore[];
}

const COLORS = ['#FBBF24', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899'];

const TopScoresPieChart: React.FC<TopScoresPieChartProps> = ({ data }) => {
  const chartData = data.map(item => ({ name: item.score, value: item.prob }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'rgba(30, 41, 59, 0.9)',
            borderColor: '#475569',
            borderRadius: '0.5rem',
            color: '#f1f5f9'
          }}
          formatter={(value: number, name: string) => [`${value}%`, `Score: ${name}`]}
        />
        <Legend iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TopScoresPieChart;
