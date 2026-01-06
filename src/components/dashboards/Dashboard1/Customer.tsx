"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartData: any = {
  series: [
    {
      name: "customers",
      data: [36, 45, 31, 47, 38, 43],
      color: "var(--color-secondary)",
    },
  ],

  chart: {
    type: "area",
    height: 70,
    sparkline: {
      enabled: true,
    },
    group: "sparklines",
    fontFamily: "inherit",
    foreColor: "#adb0bb",
  },
  color: "var(--color-secondary)",
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

const Customer = () => {
  return (
    <div>
      <CardBox className="shadow-none p-0 overflow-hidden">
        <div className="bg-lightsecondary  ">
          <div className="p-6">
            <p className="text-ld">Customers</p>
            <div className="flex gap-3 align-self">
              <h5 className="text-2xl">36,358</h5>
              <span className="text-13 text-ld font-semibold pt-1">-12%</span>
            </div>
          </div>
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="area"
            height="70px"
            width="100%"
          />
        </div>
      </CardBox>
    </div>
  );
};

export default Customer;
