"use client";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const IncomeChart = () => {
  const ChartData: any = {
    series: [
      {
        name: "",
        data: [2.5, 3.7, 3.2, 2.6, 1.9, 2.5],
      },
      {
        name: "",
        data: [-2.8, -1.1, -3.0, -1.5, -1.9, -2.8],
      },
    ],
    chart: {
      type: "bar",
      height: 200,
      fontFamily: `inherit`,
      toolbar: {
        show: false,
      },
      stacked: true,
      sparkline: {
        enabled: true,
      },
    },
    colors: ["var(--color-primary)", "var(--color-primary)"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "20%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    yaxis: {
      min: -5,
      max: 5,
      tickAmount: 4,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      theme: "light",
    },
  };
  return (
    <>
      <Chart
        options={ChartData}
        series={ChartData.series}
        type="bar"
        height='200px'
        width='100%'
      />
      <div className="flex justify-between items-end mt-4">
        <div>
          <p className="card-subtitle">Income</p>
          <h5 className="text-xl">$25,260</h5>
        </div>
        <span className="text-success text-sm">+1.20%</span>
      </div>
    </>
  );
};

export default IncomeChart;
