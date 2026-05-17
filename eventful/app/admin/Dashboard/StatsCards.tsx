"use client";

import { TrendingUp } from "lucide-react";
import React from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  change: string;
  color: string;
}

const StatsCards: React.FC<{ stats: StatCardProps[] }> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {stats.map((stat, index) => (
      <div key={index} className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
          <div className="flex items-center text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm font-medium">{stat.change}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default StatsCards;
