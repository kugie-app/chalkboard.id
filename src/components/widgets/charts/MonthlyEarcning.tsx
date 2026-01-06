"use client";
import Image from "next/image";
import React from "react";
import icon from "/public/images/svgs/icon-master-card-2.svg";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { IconArrowUpLeft } from "@tabler/icons-react";
const MonthlyEarning = () => {
  const ChartData: any = {
    series: [
      {
        name: "",
        data: [25, 66, 20, 40, 12, 58, 20],
      },
    ],
    chart: {
      type: "area",
      height: 80,
      fontFamily: `inherit`,
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    colors: ["var(--color-primary)"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      color: ["var(--color-primary)"],
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.2,
        opacityTo: 0.8,
        stops: [100],
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  return (
    <>
      <CardBox className="mt-[30px] p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center ">
            <h5 className="card-title">Monthly Earnings</h5>
            <div className="h-10 w-10 bg-lightprimary dark:bg-lightprimary rounded-md flex justify-center items-center">
              <Image src={icon} alt="icon" />
            </div>
          </div>
          <div className="flex items-center mb-3 mt-1 gap-2">
            <h4 className="text-2xl">$6,820</h4>
            <span className="rounded-full p-1 bg-lightsuccess dark:bg-lightsuccess text-success flex items-center justify-center ">
              <IconArrowUpLeft size={15} />
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

export default MonthlyEarning;
