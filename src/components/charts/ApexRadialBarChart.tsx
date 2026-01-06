"use client";
import React from "react";
import dynamic from "next/dynamic";
import TitleCard from "@/components/shared/TitleBorderCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ApexRadialChart = () => {
  const ChartData1: any = {
    series: [44, 55, 67, 83],
    chart: {
      type: "radialBar",
      height: 300,
      fontFamily: `inherit`,
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    colors: [
      "var(--color-info)",
      "var(--color-primary)",
      "var(--color-error)",
      "var(--color-warning )",
    ],

    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter() {
              return 249;
            },
          },
        },
      },
    },
  };

  const ChartData2: any = {
    series: [
      {
        name: "Sales",
        data: [80, 50, 30, 40, 100, 20],
      },
    ],
    chart: {
      type: "radar",
      height: 300,
      fontFamily: `inherit`,
      toolbar: {
        show: false,
      },
    },
    fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.2,
          opacity: 0.1,
          stops: [100]
        },
      },
    colors: ["var(--color-primary)"],
    labels: ["January", "February", "March", "April", "May", "June"],
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="md:col-span-6 col-span-12">
          <TitleCard title="Radialbar Chart">
            <Chart
              options={ChartData1}
              series={ChartData1.series}
              type="radialBar"
              height="300px"
              width="100%"
            />
          </TitleCard>
        </div>
        <div className="md:col-span-6 col-span-12">
          <TitleCard title="Radar Chart">
            <Chart
              options={ChartData2}
              series={ChartData2.series}
              type="radar"
              height="300px"
              width="100%"
            />
          </TitleCard>
        </div>
      </div>
    </>
  );
};

export default ApexRadialChart;
