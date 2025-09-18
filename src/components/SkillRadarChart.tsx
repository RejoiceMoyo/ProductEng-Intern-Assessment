'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Strength } from '@/types';

interface SkillRadarChartProps {
  strengths: Strength[];
}

export default function SkillRadarChart({ strengths }: SkillRadarChartProps) {
  // Prepare data for the chart - take top 8 skills by weight
  const chartData = strengths
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 8)
    .map(strength => ({
      subject: strength.name,
      value: strength.weight,
      fullMark: 100,
    }));

  if (chartData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No skill data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}