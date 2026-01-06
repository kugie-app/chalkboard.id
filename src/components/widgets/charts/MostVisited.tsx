"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Select } from "flowbite-react";

const MostVisited = () => {
    const ChartData: any = {
        series:[
            {
                name: 'San Francisco',
                data: [44, 55, 41, 67, 22, 43]
            },
            {
                name: 'Diego',
                data: [13, 23, 20, 8, 13, 27]
            }
        ],
        chart: {
            height: 265,
            type: 'bar',
            fontFamily: 'inherit',
            foreColor: '#adb0bb',
            toolbar: {
                show: false
            },
            stacked: true
        },
        colors: ["var(--color-primary)", "var(--color-secondary)"],
        plotOptions: {
            bar: {
                borderRadius: [6],
                horizontal: false,
                barHeight: '60%',
                columnWidth: '40%',
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all'
            }
        },
        stroke: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        grid: {
            show: false,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        yaxis: {
            tickAmount: 4
        },
        xaxis: {
            categories: ['01', '02', '03', '04', '05', '06'],
            axisTicks: {
                show: false
            }
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
            x: {
                show: false
            }
        }
    }
  return (
    <>
      <CardBox className="mt-[30px] overflow-hidden">
        <div className="flex justify-between items-center ">
          <h5 className="card-title">Most Visited</h5>
          <Select id="countries" className="select-md" required>
            <option selected>March 2024</option>
            <option>April 2024</option>
            <option>May 2024</option>
          </Select>
        </div>
        <div className="rounded-bars -ms-4 mt-4">
        <Chart
              options={ChartData}
              series={ChartData.series}
              type="bar"
              height='265px'
              width='100%'

            />
            <div className="flex gap-5 justify-center items-center">
              <div className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                <span className="text-sm">San Francisco</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full bg-secondary"></span>
                <span className="text-sm">Diego</span>
              </div>
            </div>
        </div>
      </CardBox>
    </>
  );
};

export default MostVisited;
