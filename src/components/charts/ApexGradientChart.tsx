"use client";
import React from "react";
import dynamic from "next/dynamic";
import TitleCard from "@/components/shared/TitleBorderCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ApexGradientChart = () => {
  const ChartData: any = {
    series: [
        {
            name: 'Likes',
            data: [4, 3, 10, 9, 35, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }
    ],
    chart: {
        type: 'line',
        height: 350,
        fontFamily: `inherit`,
        foreColor: '#adb0bb',
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            color: 'rgba(0,0,0,0.2)',
            top: 12,
            left: 4,
            blur: 3,
            opacity: 0.4
        }
    },
    stroke: {
        width: 7,
        curve: 'smooth'
    },

    xaxis: {
        type: 'datetime',
        categories: [
            '1/11/2000',
            '2/11/2000',
            '3/11/2000',
            '4/11/2000',
            '5/11/2000',
            '6/11/2000',
            '7/11/2000',
            '8/11/2000',
            '9/11/2000',
            '10/11/2000',
            '11/11/2000',
            '12/11/2000',
            '1/11/2001',
            '2/11/2001',
            '3/11/2001',
            '4/11/2001',
            '5/11/2001',
            '6/11/2001'
        ],
        axisBorder: {
            color: "rgba(173,181,189,0.3)",
        },
    },  
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            gradientToColors: ['#0b70fb'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100, 100, 100]
        }
    },
    markers: {
        size: 4,
        opacity: 0.9,
        colors: ['#4e79ff'],
        strokeColor: '#fff',
        strokeWidth: 2,

        hover: {
            size: 7
        }
    },
    yaxis: {
        min: 0,
        max: 40
    },
    grid: {
        show: false
    },
    tooltip: {
        theme: 'light'
    }
  };
  return (
    <>
      <TitleCard title="Gradient Chart">
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="line"
          height="350px"
          width="100%"
        />
      </TitleCard>
    </>
  );
};

export default ApexGradientChart;
