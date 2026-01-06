"use client";
import React from "react";
import dynamic from "next/dynamic";
import TitleCard from "@/components/shared/TitleBorderCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ApexLineChart = () => {
  const ChartData: any = {
    series: [
      {
        name: "High - 2024",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Low - 2024",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      foreColor: "#adb0bb",
      fontFamily: `inherit`,
      offsetX: -5,
      zoom: {
        type: "x",
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      shadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 1,
      },
    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      title: {
        text: "Month",
      },
      axisBorder: {
        color: "rgba(173,181,189,0.3)",
      },
    },
    grid: {
      show: false,
      padding: {
        left: 20,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
      width: "2",
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  return (
    <>
      <TitleCard title="Line Chart">
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="line"
          height="350px"
          width="100%"
        />
      </TitleCard>
    </>
  );
};

export default ApexLineChart;
