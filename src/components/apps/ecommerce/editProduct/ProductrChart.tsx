"use client";
import CardBox from "@/components/shared/CardBox";
import { Badge } from "flowbite-react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import React from "react";

const ProductrChart = () => {
  const ChartData: any = {
    series: [
      {
        name: "Sales",
        data: [20, 15, 30, 25, 10, 18, 20, 25, 10],
      },
    ],
    chart: {
      type: "bar",
      height: 80,
      fontFamily: `inherit`,
      sparkline: {
        enabled: true,
      },
    },
    colors: ["var(--color-primary)"],

    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "60%",
        distributed: true,
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2.5,
      colors: ["rgba(0,0,0,0.01)"],
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    axisBorder: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
    },
  };
  return (
    <>
      <CardBox>
        <h5 className="card-title mb-2">$2,420</h5>
        <p className="flex gap-2 items-center">
          Average Daily Sales
          <Badge color={"lightsuccess"}>5.6%</Badge>
        </p>
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="bar"
          height="80px"
          width="100%"
          className="mt-8"
        />
      </CardBox>
    </>
  );
};

export default ProductrChart;
