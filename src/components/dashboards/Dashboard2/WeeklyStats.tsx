"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { HR } from "flowbite-react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ChartData: any = {
  series: [
    {
      name: "Weekly Stats",
      data: [20, 15, 18, 25, 10, 15, 20],
    },
  ],

  chart: {
    toolbar: {
      show: false,
    },

    height: 220,
    type: "bar",
    offsetX: -30,
    fontFamily: "inherit",
    foreColor: "#adb0bb",
  },
  colors: [
    "rgba(173,176,187,.15)",
    "rgba(173,176,187,.15)",
    "rgba(173,176,187,.15)",
    "var(--color-primary)",
    "rgba(173,176,187,.15)",
    "rgba(173,176,187,.15)",
    "rgba(173,176,187,.15)",
  ],
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: "55%",
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
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  xaxis: {
    categories: [
      ["Apr"],
      ["May"],
      ["June"],
      ["July"],
      ["Aug"],
      ["Sept"],
      ["Oct"],
    ],
    axisBorder: {
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

const WeeklyStats = () => {
  return (
    <>
      <CardBox>
        <div>
          <h5 className="card-title">Weekly Stats</h5>
          <p className="card-subtitle">Overview of Profit</p>
        </div>
        <div className="-me-12 rtl:-me-0 rtl:-ms-12">
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="bar"
            height="220px"
            width="100%"
          />
        </div>
        <HR className="my-4" />
        <div className="flex justify-between">
          <div className="basis-3/6">
            <div className="flex gap-3 items-center">
              <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-lighterror rounded-tw">
                <Icon
                  icon="solar:course-down-linear"
                  className="text-error"
                  height={24}
                />
              </span>
              <div>
                <p className="text-ld opacity-80">Sales</p>
                <h5 className="font-bold text-15">$36,850</h5>
              </div>
            </div>
          </div>
          <div className="basis-3/6 ps-3">
            <div className="flex gap-3 items-center">
              <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-lightprimary rounded-tw">
                <Icon
                  icon="solar:chart-linear"
                  className="text-primary"
                  height={24}
                />
              </span>
              <div>
                <p className="text-ld opacity-80">Expenses</p>
                <h5 className="font-bold text-15">$4,720</h5>
              </div>
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default WeeklyStats;
