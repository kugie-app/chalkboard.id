"use client";
import React from "react";
import CardBox from "../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RevenueBreakdownChartProps {
  data: {
    tableRevenue: number;
    fnbRevenue: number;
    totalRevenue: number;
  };
  title: string;
  subtitle?: string;
}

const RevenueBreakdownChart: React.FC<RevenueBreakdownChartProps> = ({ data, title, subtitle }) => {
  const chartData: any = {
    series: [data.tableRevenue, data.fnbRevenue],
    labels: ["Table Rental", "F&B Sales"],
    chart: {
      type: "donut",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 300,
    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          background: "transparent",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontWeight: "600",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: "700",
              offsetY: 10,
              formatter: function (val: string) {
                return new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(parseInt(val));
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total Revenue",
              fontSize: "16px",
              fontWeight: "600",
              color: "#5A6A85",
              formatter: function () {
                return new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(data.totalRevenue);
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
      y: {
        formatter: function (val: number) {
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(val);
        },
      },
    },
  };

  const tablePercentage = data.totalRevenue > 0 ? ((data.tableRevenue / data.totalRevenue) * 100).toFixed(1) : 0;
  const fnbPercentage = data.totalRevenue > 0 ? ((data.fnbRevenue / data.totalRevenue) * 100).toFixed(1) : 0;

  return (
    <CardBox>
      <div className="mb-4">
        <h5 className="card-title">{title}</h5>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      
      <Chart
        options={chartData}
        series={chartData.series}
        type="donut"
        height="300px"
        width="100%"
      />
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm font-medium">Table Rental</span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-semibold">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(data.tableRevenue)}
            </div>
            <div className="text-sm text-bodytext">{tablePercentage}%</div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-sm font-medium">F&B Sales</span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-semibold">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(data.fnbRevenue)}
            </div>
            <div className="text-sm text-bodytext">{fnbPercentage}%</div>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default RevenueBreakdownChart; 