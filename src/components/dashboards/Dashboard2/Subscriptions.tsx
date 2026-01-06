"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ChartData: any = {
  series: [
    {
      name: "Site A",
      data: [29, 52, 38, 47, 56, 41, 46],
    },
    {
      name: "Site B",
      data: [71, 71, 71, 71, 71, 71, 71],
    },
  ],
  chart: {
    fontFamily: "inherit",
    foreColor: "#adb0bb",
    type: "bar",
    height: 98,
    stacked: true,
    offsetX: 0,
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ["var(--color-white)", "rgba(255,255,255,0.5)"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "26%",
      borderRadius: [3],
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "all",
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: "dark",
  },
  legend: {
    show: false,
  },
};
const Subscriptions = () => {
  return (
    <>
      <CardBox className="shadow-none px-6 bg-lighterror dark:bg-lighterror">
        <div className="flex justify-between ">
          <div>
            <p className="text-ld text-15 font-semibold">Subscriptions</p>
            <div className="flex gap-3 align-self mb-4">
              <h5 className="text-2xl">78,298</h5>
              <span className="text-13 text-ld font-semibold pt-1">-12%</span>
            </div>
          </div>
          <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-white dark:bg-dark rounded-tw">
            <Icon
              icon="solar:layers-linear"
              className="text-error"
              height={20}
            />
          </span>
        </div>
        <div className="rounded-bars">
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="bar"
            height="98px"
            width="100%"
          />
        </div>
      </CardBox>
    </>
  );
};

export default Subscriptions;
