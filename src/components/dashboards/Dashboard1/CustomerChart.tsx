"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ChartData: any = {
  series: [
    {
      name: "April 07 ",
      data: [0, 20, 15, 19, 14, 25, 30],
    },
    {
      name: "Last Week",
      data: [0, 8, 19, 13, 26, 16, 25],
    },
  ],
  chart: {
    fontFamily: "inherit",
    height: 100,
    type: "line",
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ["var(--color-primary)", "var(--color-lightprimary)"],
  grid: {
    show: false,
  },
  stroke: {
    curve: "smooth",
    colors: ["var(--color-primary)", "var(--color-lightprimary)"],
    width: 2,
  },
  markers: {
    colors: ["var(--color-primary)", "var(--color-lightprimary)"],
    strokeColors: "transparent",
  },
  tooltip: {
    theme: "dark",
    x: {
      show: false,
    },
    followCursor: true,
  },
};
const CustomerChart = () => {
  return (
    <>
      <CardBox>
        <div className="flex justify-between align-baseline">
          <div>
            <h5 className="card-title">Customers</h5>
            <p className="card-subtitle">Last 7 days</p>
          </div>
          <span className="text-13 font-semibold text-success">+26.5%</span>
        </div>
        <div className="mt-5">
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="line"
            height="100px"
            width="100%"
          />
        </div>
        <div className="mt-8">
          <div className="flex justify-between">
            <div className="flex gap-2 text-sm  items-center">
              <span className="bg-primary rounded-full h-2 w-2"></span>
              <span className="text-ld opacity-90">April 07 - April 14</span>
            </div>
            <span className="text-ld opacity-90 ">6,380</span>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex gap-2 text-sm  items-center">
              <span className="bg-muted rounded-full h-2 w-2"></span>
              <span className="text-ld opacity-90">Last Week</span>
            </div>
            <span className="text-ld opacity-90 ">4,298</span>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default CustomerChart;
