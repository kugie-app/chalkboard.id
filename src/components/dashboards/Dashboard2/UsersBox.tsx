"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ChartData: any = {
  chart: {
    id: "customers",
    type: "area",
    height: 95,
    sparkline: {
      enabled: true,
    },
    group: "sparklines",
    fontFamily: "inherit",
    foreColor: "#adb0bb",
  },
  series: [
    {
      name: "Users",
      color: "var(--color-secondary)",
      data: [36, 45, 31, 47, 38, 43],
    },
  ],
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    color: "var(--color-secondary)",

    gradient: {
      shadeIntensity: 0,
      inverseColors: false,
      opacityFrom: 0.2,
      opacityTo: 0.8,
      stops: [100],
    },
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
const UsersBox = () => {
  return (
    <>
      <CardBox className="shadow-none p-0 bg-lightsecondary dark:bg-lightsecondary overflow-hidden">
        <div className="flex justify-between py-30 px-6">
          <div>
            <p className="text-ld text-15 font-semibold">Users</p>
            <div className="flex gap-3 align-self mb-4">
              <h5 className="text-2xl">14,872</h5>
              <span className="text-13 text-ld font-semibold pt-1">+6.4%</span>
            </div>
          </div>
          <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-white dark:bg-dark rounded-tw">
            <Icon
              icon="solar:pie-chart-3-line-duotone"
              className="text-secondary"
              height={20}
            />
          </span>
        </div>
        <div>
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="area"
            height="95px"
            width="100%"
          />
        </div>
      </CardBox>
    </>
  );
};

export default UsersBox;
