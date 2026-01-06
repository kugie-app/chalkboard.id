"use client";
import React from "react";
import CardBox from "../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TableUtilizationChartProps {
  data: {
    tableId: number;
    tableName: string;
    utilizationRate: number;
    totalRevenue: number;
    totalSessions: number;
  }[];
  title: string;
  subtitle?: string;
}

const TableUtilizationChart: React.FC<TableUtilizationChartProps> = ({ data, title, subtitle }) => {
  const chartData: any = {
    series: [
      {
        name: "Utilization Rate (%)",
        data: data.map(d => Math.round(d.utilizationRate * 100) / 100),
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    colors: ["var(--color-primary)"],
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "50%",
        borderRadius: 4,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
      formatter: function (val: number) {
        return val.toFixed(1) + "%";
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: data.map(d => d.tableName),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Utilization Rate (%)",
      },
      labels: {
        formatter: (val: number) => val.toFixed(1) + "%",
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      shared: false,
      intersect: false,
      y: {
        formatter: function (val: number, opts: any) {
          const tableIndex = opts.dataPointIndex;
          const tableData = data[tableIndex];
          
          return `
            <div>
              <div>Utilization: ${val.toFixed(1)}%</div>
              <div>Sessions: ${tableData.totalSessions}</div>
              <div>Revenue: ${new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(tableData.totalRevenue)}</div>
            </div>
          `;
        },
      },
    },
  };

  return (
    <CardBox>
      <div className="mb-4">
        <h5 className="card-title">{title}</h5>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      <Chart
        options={chartData}
        series={chartData.series}
        type="bar"
        height="350px"
        width="100%"
      />
    </CardBox>
  );
};

export default TableUtilizationChart; 