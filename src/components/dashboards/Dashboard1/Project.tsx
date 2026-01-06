"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartData: any = {
  series: [
    {
      name: "Project",
      data: [3, 5, 5, 7, 6, 5, 3, 5, 3],
      labels: ["2012", "2013", "2014", "2015", "2016", "2017"],
    },
  ],

  chart: {
    fontFamily: "inherit",
    height: 55,
    type: "bar",
    offsetX: -3,
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ["#fff"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "flat",
      borderRadius: 4,
    },
  },
  tooltip: {
    theme: "dark",
    followCursor: true,
  },
};

const Project = () => {
  return (
    <div>
      <CardBox className="shadow-none p-0 overflow-hidden">
        <div className="bg-lighterror p-6 ">
          <p className="text-ld">Projects</p>
          <div className="flex gap-3 align-self mb-4">
            <h5 className="text-2xl">78,298</h5>
            <span className="text-13 text-ld font-semibold pt-1">+31.8%</span>
          </div>
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="bar"
            height="55px"
            width="100%"
          />
        </div>
      </CardBox>
    </div>
  );
};

export default Project;
