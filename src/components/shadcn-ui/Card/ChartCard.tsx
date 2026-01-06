"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/Default-Ui/card";
import dynamic from "next/dynamic";
import { IconGridDots } from "@tabler/icons-react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartCard = () => {
  const ChartData: any = {
    series: [
      {
        name: "Footware",
        data: [2.5, 3.7, 3.2, 2.6, 1.9, 2.5],
      },
      {
        name: "Fashionware",
        data: [-2.8, -1.1, -3.2, -1.5, -1.9, -2.8],
      },
    ],
    chart: {
      height: 290,
      type: "bar",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      offsetX: -20,
      stacked: true,
    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "20%",
        borderRadius: [5],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    yaxis: {
      min: -5,
      max: 5,
      tickAmount: 4,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
  };
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Chart Card</CardTitle>
          <CardDescription>Overview of Profit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="-me-6">
            <Chart
              options={ChartData}
              series={ChartData.series}
              type="bar"
              height="290px"
              width="100%"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-3 items-center">
            <div className="bg-lightprimary dark:bg-lightprimary h-10 w-10 flex justify-center items-center rounded-md">
              <IconGridDots size={20} className="text-primary" />
            </div>
            <div>
              <h6 className="text-base">$23,450</h6>
              <p className=" text-sm">Salary</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-lightsecondary dark:bg-lightsecondary h-10 w-10 flex justify-center items-center rounded-md">
              <IconGridDots size={20} className="text-secondary" />
            </div>
            <div>
              <h6 className="text-base">$23,450</h6>
              <p className=" text-sm">Expance</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ChartCard;
