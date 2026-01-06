"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { IconArrowDownRight } from "@tabler/icons-react";

const Customers = () => {
  const ChartData: any = {
    chart: {
      id: "customers",
      type: "area",
      height: 80,
      sparkline: {
        enabled: true,
      },
      group: "customers",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },

    series: [
      {
        name: "",
        color: "var(--color-secondary)",
        data: [30, 25, 35, 20, 30, 40],
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.1,
        opacityTo: 0,
        stops: [20, 180],
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
  return (
    <>
      <CardBox className="overflow-hidden p-0">
        <div className="p-6">
          <p className="text-subtitle">Customers</p>
          <h5 className="text-xl">36,358</h5>
          <div className="flex items-center mt-1 gap-1.5">
            <span className="rounded-full p-1 bg-lighterror dark:bg-lighterror text-error flex items-center justify-center ">
              <IconArrowDownRight size={15} />
            </span>
            <p className="text-dark dark:text-white text-sm mb-0">+9%</p>
          </div>
        </div>
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="area"
          height='80px'
          width='100%'
        />
      </CardBox>
    </>
  );
};

export default Customers;
