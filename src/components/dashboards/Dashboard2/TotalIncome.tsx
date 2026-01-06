"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ChartData: any = {
  chart: {
    id: "sparkline3",
    type: "line",
    fontFamily: "inherit",
    foreColor: "#adb0bb",
    height: 60,
    sparkline: {
      enabled: true,
    },
    group: "sparklines",
  },
  series: [
    {
      name: "Income",
      color: "var(--color-error)",
      data: [30, 25, 35, 20, 30, 40],
    },
  ],
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 0,
  },
  tooltip: {
    theme: "dark",
    fixed: {
      enabled: true,
      position: "right",
    },
    x: {
      show: false,
    },
  },
};
const TotalIncome = () => {
  return (
    <>
      <CardBox className="mt-30">
        <div className="flex items-center gap-3">
          <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-lighterror rounded-tw">
            <Icon icon="solar:box-linear" className="text-error" height={24} />
          </span>
          <span className="font-medium text-base text-ld">Total Income</span>
        </div>
        <div className="flex gap-6 mt-4">
          <div className="basis-3/6">
            <h4 className="text-2xl pb-1">$680</h4>
            <span className="font-semibold text-success">+18%</span>
          </div>
          <div className="basis-3/6 ms-auto">
            <Chart
              options={ChartData}
              series={ChartData.series}
              type="line"
              height="60px"
              width="100%"
            />
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default TotalIncome;
