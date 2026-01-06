"use client";
import React from "react";
import dynamic from "next/dynamic";
import TitleCard from "@/components/shared/TitleBorderCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ApexAreaChart = () => {
  const ChartData: any = {
    series: [
      {
        name: "Sales Summery 1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Sales Summery 2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
        id: 'area-chart',
        fontFamily: `inherit`,
        foreColor: '#adb0bb',
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.2,
          opacity: 0.1,
          stops: [100]
        },
      },
      stroke: {
        width: '3',
        curve: 'smooth',
      },
      colors: ["var(--color-primary)", "var(--color-secondary)"],
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00',
          '2018-09-19T01:30:00',
          '2018-09-19T02:30:00',
          '2018-09-19T03:30:00',
          '2018-09-19T04:30:00',
          '2018-09-19T05:30:00',
          '2018-09-19T06:30:00',
        ],
         axisBorder: {
            color: "rgba(173,181,189,0.3)",
        },
      },
      yaxis: {
        opposite: false,
        labels: {
          show: true,
        },
       
      },
      legend: {
        show: true,
        position: 'bottom',
        width: '50px',
      },
      grid: {
        show: false,
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
  };
  return (
    <>
      <TitleCard title="Area Chart">
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="area"
          height="300px"
          width="100%"
        />
      </TitleCard>
    </>
  );
};

export default ApexAreaChart;
