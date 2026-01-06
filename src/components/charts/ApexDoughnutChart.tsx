"use client";
import React from "react";
import dynamic from "next/dynamic";
import TitleCard from "@/components/shared/TitleBorderCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ApexDoughnutChart = () => {
  const ChartData1: any = {
    series: [44, 55, 41, 17, 15],
    chart: {
      type: "donut",
      height: 300,
      fontFamily: `inherit`,
      foreColor: "#adb0bb",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70px",
        },
      },
    },
    stroke: {
      width: 2,
      colors: "var(--color-surface-ld)",
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
    },
    colors: [
      "var(--color-info)",
      "var(--color-primary)",
      "var(--color-error)",
      "var(--color-success)",
      "var(--color-warning )",
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const ChartData2: any = {
    series: [44, 55, 13, 43, 22],
    chart: {
      type: "pie",
      height: 300,
      fontFamily: `inherit`,
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70px",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
    },
    colors: [
      "var(--color-info)",
      "var(--color-primary)",
      "var(--color-error)",
      "var(--color-success)",
      "var(--color-warning )",
    ],
    tooltip: {
      fillSeriesColor: false,
    },
    stroke: {
      width: 2,
      colors: "var(--color-surface-ld)",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <>
      
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="md:col-span-6 col-span-12">
          <TitleCard title="Donut Chart">
            <Chart
              options={ChartData1}
              series={ChartData1.series}
              type="donut"
              height="300px"
              width="100%"
            />
          </TitleCard>
        </div>
        <div className="md:col-span-6 col-span-12">
          <TitleCard title="Pie Chart">
            <Chart
              options={ChartData2}
              series={ChartData2.series}
              type="pie"
              height="300px"
              width="100%"
            />
          </TitleCard>
        </div>
      </div>
    </>
  );
};

export default ApexDoughnutChart;
