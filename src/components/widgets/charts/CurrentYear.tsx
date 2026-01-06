"use client";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CurrentYear = () => {
  const ChartData: any = {
    series: [55, 55, 55],
    labels: ["Income", "Current", "Expance"],
    chart: {
      type: "donut",
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
    colors: ["var(--color-primary)", "#EAEFF4", "var(--color-secondary)"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "89%",
          background: "transparent",

          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 7,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              fontSize: "20px",
              fontWeight: "600",
              label: "$98,260",
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
      show: false,
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };
  return (
    <>
      <Chart
        options={ChartData}
        series={ChartData.series}
        type="donut"
        height='200px'
        width='100%'
      />
      <div className="flex justify-between items-end mt-4">
        <div>
          <p className="card-subtitle">Current Year</p>
          <h5 className="text-xl">$98,260</h5>
        </div>
        <span className="text-success text-sm">+2.5%</span>
      </div>
    </>
  );
};

export default CurrentYear;
