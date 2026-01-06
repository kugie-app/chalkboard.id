"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { IconArrowDownRight } from "@tabler/icons-react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const PageImpression = () => {
  const ChartData: any = {
    series: [
      {
        name: "",
        data: [20, 15, 30, 25, 10],
      },
    ],

    chart: {
      toolbar: {
        show: false,
      },
      height: 100,
      type: "bar",
      sparkline: {
        enabled: true,
      },
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    colors: [
      "var(--color-lightsecondary)",
      "var(--color-lightsecondary)",
      "var(--color-secondary)",
      "var(--color-lightsecondary)",
      "var(--color-lightsecondary)",
    ],
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: "64%",
        distributed: true,
        endingShape: "rounded",
      },
    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
  };
  return (
    <>
      <CardBox className="mt-[30px] overflow-hidden">
        <h5 className="card-title">Page Impressions</h5>
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6">
            <h6 className="text-xl">$456,120</h6>
            <p className="text-bodytext text-xs">(Change Yesterday)</p>
            <div className="flex items-center mt-3 gap-2">
              <span className="rounded-full p-1 bg-lighterror dark:bg-lighterror text-error flex items-center justify-center ">
                <IconArrowDownRight size={15} />
              </span>
              <p className="text-dark dark:text-white text-sm mb-0">+9%</p>
            </div>
          </div>
          <div className="col-span-6">
            <div className="-me-4">
              <Chart
                options={ChartData}
                series={ChartData.series}
                type="bar"
                height='100px'
                width='100%'
              />
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default PageImpression;
