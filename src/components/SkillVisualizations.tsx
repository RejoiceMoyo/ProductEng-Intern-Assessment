'use client';

import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BarChart3, Radar as RadarIcon, PieChart as PieChartIcon, Grid } from 'lucide-react';

interface Strength {
  id: string;
  name: string;
  weight: number;

  recommendations: number;
}

interface SkillVisualizationsProps {
  strengths: Strength[];
}

export default function SkillVisualizations({ strengths }: SkillVisualizationsProps) {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Prepare data for Bar Chart
  const chartData = strengths
    .sort((a: Strength, b: Strength) => b.weight - a.weight)
    .slice(0, 8)
    .map((strength: Strength) => ({
      name: strength.name,
      value: strength.weight,
      fullMark: 100,
    }));

  if (chartData.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          <Grid className="w-6 h-6 text-gray-400" />
        </div>
        <p>No skill data available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Bar Chart Only */}
      <div className="bg-white rounded-lg p-4 border mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" name="Proficiency" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{strengths.length}</div>
          <div className="text-sm text-blue-800">Total Skills</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(strengths.reduce((sum: number, s: Strength) => sum + s.weight, 0) / strengths.length)}%
          </div>
          <div className="text-sm text-green-800">Avg Score</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {strengths.filter((s: Strength) => s.weight > 80).length}
          </div>
          <div className="text-sm text-purple-800">Expert Skills</div>
        </div>
      </div>
    </div>
  );
}



