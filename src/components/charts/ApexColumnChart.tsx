"use client";
import React from "react";
import dynamic from "next/dynamic";
import TitleCard from "@/components/shared/TitleBorderCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ApexColumnChart = () => {
  const ChartData: any = {
    series: [
        {
            name: 'Desktop',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
            name: 'Mobile',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
            name: 'Other',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
    ],
    chart: {
        type: 'bar',
        height: 350,
        fontFamily: `inherit`,
        foreColor: '#a1aab2',
        toolbar: {
          show: false,
        },
    },
    colors: ['var(--color-error)', 'var(--color-primary)', 'var(--color-secondary)'],
    plotOptions: {
        bar: {
            horizontal: false,
            endingShape: 'rounded',
            columnWidth: '20%'
        }
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },

    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        axisBorder: {
            color: "rgba(173,181,189,0.3)",
        },
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
        opacity: 1
    },
   
    tooltip: {
        theme: 'dark',
        y: {
          formatter(val:any) {
            return `$ ${val} thousands`;
          },
        },
    },
    grid: {
      show: false,
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                yaxis: {
                    show: false
                }
            }
        }
    ]
  };
  return (
    <>
      <TitleCard title="Column Chart">
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="bar"
          height="300px"
          width="100%"
        />
      </TitleCard>
    </>
  );
};

export default ApexColumnChart;
