"use client";
import { IconArrowUpLeft } from "@tabler/icons-react";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import CardBox from "../../shared/CardBox";

const YarlyBreakup = () => {
  const ChartData: any = {
    color: "#adb5bd",
    series: [38, 40, 25],
    labels: ["2023", "2022", "2024"],
    chart: {
      height: 150,
      type: "donut",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
        },
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
    colors: [
      "var(--color-primary)",
      "var(--color-lightprimary)",
      "var(--color-lightsecondary)",
    ],

    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };
  return (
    <>
      <CardBox>
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6">
            <h5 className="card-title mb-4">Yearly Breakup</h5>
            <h6 className="text-xl">$36,358</h6>
            <div className="flex items-center mb-3 mt-1 gap-2">
              <span className="rounded-full p-1 bg-lightsuccess dark:bg-lightsuccess text-success flex items-center justify-center ">
                <IconArrowUpLeft size={15} />
              </span>
              <p className="text-dark dark:text-white text-sm mb-0">+9%</p>
              <p className=" mb-0 text-sm">last year</p>
            </div>
            <div className="flex gap-3 items-center mt-8">
              <div className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                <span className="text-xs ">2023</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full bg-lightsecondary"></span>
                <span className="text-xs ">2024</span>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <Chart
              options={ChartData}
              series={ChartData.series}
              type="donut"
              height='150px'
              width='100%'
   
            />
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default YarlyBreakup;
