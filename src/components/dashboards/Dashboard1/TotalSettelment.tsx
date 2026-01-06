"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ChartData: any = {
  series: [
    {
      name: "settlements",
      data: [
        40, 40, 80, 80, 30, 30, 10, 10, 30, 30, 100, 100, 20, 20, 140, 140,
      ],
    },
  ],
  chart: {
    fontFamily: "inherit",
    type: "line",
    height: 315,
    toolbar: { show: !1 },
  },
  legend: { show: !1 },
  dataLabels: { enabled: !1 },
  stroke: {
    curve: "smooth",
    show: !0,
    width: 2,
    colors: ["var(--color-primary)"],
  },
  xaxis: {
    categories: [
      "1W",
      "",
      "3W",
      "",
      "5W",
      "6W",
      "7W",
      "8W",
      "9W",
      "",
      "11W",
      "",
      "13W",
      "",
      "15W",
    ],
    axisBorder: { show: !1 },
    axisTicks: { show: !1 },
    tickAmount: 6,
    labels: {
      rotate: 0,
      rotateAlways: !0,
      style: { fontSize: "10px", colors: "#98A4AE", fontWeight: "600" },
    },
  },
  yaxis: {
    show: false,
    tickAmount: 3,
  },
  tooltip: {
    theme: "dark",
  },
  colors: ["var(--color-primary)"],
  grid: {
    borderColor: "var(--color-lightprimary)",
    strokeDashArray: 4,

    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  markers: {
    strokeColor: ["var(--color-primary)"],
    strokeWidth: 3,
  },
};
const TotalSettelment = () => {
  return (
    <>
      <CardBox className="overflow-hidden bg-lightprimary dark:bg-lightprimary">
        <div className="flex gap-4 items-center">
          <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-white rounded-tw">
            <Icon
              icon="solar:box-linear"
              className="text-primary"
              height={24}
            />
          </span>
          <div>
            <p className="text-ld mb-1">Total settlements</p>
            <h5 className="card-title text-22 font-bold">$122,580</h5>
          </div>
        </div>
        <div>
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="line"
            height="315px"
            width="100%"
          />
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-6 text-center">
            <p className="text-ld mb-1 opacity-90">Total balance</p>
            <h5 className="card-title text-22 font-semibold">$122,580</h5>
          </div>
          <div className="col-span-6 text-center">
            <p className="text-ld mb-1 opacity-90">Withdrawals</p>
            <h5 className="card-title text-22 font-semibold">$31,640</h5>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default TotalSettelment;
