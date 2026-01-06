"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import CardBox from "../shared/CardBox";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface PeakHoursChartProps {
  data: {
    hour: number;
    sessions: number;
    sessionRevenue: number;
    fnbOrders: number;
    fnbRevenue: number;
    totalRevenue: number;
  }[];
  title: string;
  subtitle?: string;
}

const PeakHoursChart: React.FC<PeakHoursChartProps> = ({ data, title, subtitle }) => {
  const tAnalytics = useTranslations('Analytics');
  const chartData = data.map(d => ({
    hour: `${d.hour}:00`,
    sessions: d.sessions,
    sessionRevenue: d.sessionRevenue,
    fnbOrders: d.fnbOrders,
    fnbRevenue: d.fnbRevenue,
    totalRevenue: d.totalRevenue,
  }));

  return (
    <CardBox>
      <div className="mb-4">
        <h5 className="card-title">{title}</h5>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="hour" 
              className="text-xs"
            />
            <YAxis 
              className="text-xs"
            />
            <Tooltip 
              formatter={(value: any, name: any) => {
                if (name === 'sessions') {
                  return [Number(value) || 0, tAnalytics('tooltip.sessions')];
                }
                if (name === 'fnbOrders') {
                  return [Number(value) || 0, tAnalytics('tooltip.fnbOrders')];
                }
                return [Number(value) || 0, name || ''];
              }}
              labelFormatter={(label) => `${tAnalytics('labels.hour')}: ${label}`}
            />
            <Legend />
            <Bar dataKey="sessions" fill="#3b82f6" name={tAnalytics('tooltip.sessions')} />
            <Bar dataKey="fnbOrders" fill="#10b981" name={tAnalytics('tooltip.fnbOrders')} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBox>
  );
};

export default PeakHoursChart; 