"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RevenueUpdates = () => {
  const ChartData: any = {
    series: [
      {
        name: "Footware",
        data: [2.5, 3.7, 3.2, 2.6, 1.9, 2.5]
      },
      {
        name: "Fashionware",
        data: [-2.8, -1.1, -3.2, -1.5, -1.9, -2.8]
      },
    ],
    chart: {
      height: 290,
      type: "bar",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      offsetX: -20,
      stacked: true,
    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "20%",
        borderRadius: [5],
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
    },
    yaxis: {
      min: -5,
      max: 5,
      tickAmount: 4,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May","June"],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
  };
  return (
    <>
      <CardBox className="pb-3">
        <div>
          <h5 className="card-title">Revenue Updates</h5>
          <p className="card-subtitle">Overview of Profit</p>
        </div>
        <div className="flex gap-5 mt-5 items-center">
          <div className="flex gap-2 items-center">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            <span className="text-xs">Footware</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="h-2 w-2 rounded-full bg-secondary"></span>
            <span className="text-xs">Fashionware</span>
          </div>
        </div>
        <div className="revenuechart -me-6">
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="bar"
            height='290px'
            width='100%'
          />
        </div>
      </CardBox>
    </>
  );
};

export default RevenueUpdates;
