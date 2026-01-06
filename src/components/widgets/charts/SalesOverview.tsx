"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { IconGridDots } from "@tabler/icons-react";

const SalesOverview = () => {
  const ChartData: any = {
    color: "#adb5bd",
    series: [38, 40, 25],
    labels: ["Expance", "Revenue", "Profit"],
    chart: {
      type: "donut",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 280,
    },
    plotOptions: {
      pie: {
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
              color: "#5A6A85",
              fontSize: "20px",
              fontWeight: "600",
              label: "$500,458",
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
    colors: ["var(--color-secondary)", "#EAEFF4", "var(--color-primary)"],

    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };
  return (
    <>
      <CardBox className="mt-[30px]">
        <div>
          <h5 className="card-title">Sales Overview</h5>
          <p className="card-subtitle">Every Month</p>
        </div>
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="donut"
          height='280px'
          width='100%'
        />

        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-3 items-center">
            <div className="bg-lightprimary dark:bg-lightprimary h-10 w-10 flex justify-center items-center rounded-md">
              <IconGridDots size={20} className="text-primary" />
            </div>
            <div>
              <h6 className="text-base">$23,450</h6>
              <p className=" text-sm">Salary</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-lightsecondary dark:bg-lightsecondary h-10 w-10 flex justify-center items-center rounded-md">
              <IconGridDots size={20} className="text-secondary" />
            </div>
            <div>
              <h6 className="text-base">$23,450</h6>
              <p className=" text-sm">Expance</p>
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default SalesOverview;
