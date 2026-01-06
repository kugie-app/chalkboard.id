"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
import moment from "moment";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ChartData: any = {
  series: [
    {
      data: [
        {
          x: "Sun",
          y: [
            new Date("2024-02-27").getTime(),
            new Date("2024-03-04").getTime(),
          ],
          fillColor: "var(--color-primary)",
        },
        {
          x: "Mon",
          y: [
            new Date("2024-03-04").getTime(),
            new Date("2024-03-10").getTime(),
          ],
          fillColor: "var(--color-darklink)",
        },
        {
          x: "Tue",
          y: [
            new Date("2024-03-01").getTime(),
            new Date("2024-03-06").getTime(),
          ],
          fillColor: "var(--color-error)",
        },
      ],
    },
  ],

  chart: {
    id: "sparkline3",
    type: "rangeBar",
    fontFamily: "inherit",
    foreColor: "#adb0bb",
    height: 300,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      dataLabels: {
        hideOverflowingLabels: false,
      },
    },
  },
  dataLabels: {
    enabled: true,
    background: {
      borderRadius: 20,
    },
    formatter: function (
      val: moment.MomentInput[],
      opts: {
        w: { globals: { labels: { [x: string]: any } } };
        dataPointIndex: string | number;
      }
    ) {
      var label = opts.w.globals.labels[opts.dataPointIndex];
      var a = moment(val[0]);
      var b = moment(val[1]);
      return label + ": " + "Meeting with Sunil";
    },
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: { fontSize: "13px", colors: "#adb0bb", fontWeight: "400" },
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: { fontSize: "13px", colors: "#adb0bb", fontWeight: "400" },
    },
  },
  grid: {
    borderColor: "rgba(0,0,0,0.05)",
  },
  tooltip: {
    theme: "dark",
  },
};
const WeeklySchedule = () => {
  return (
    <>
      <CardBox className="pb-4">
        <div>
          <h5 className="card-title">Weekly Scheduels</h5>
        </div>
        <div className="rounded-pill-bars">
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="rangeBar"
            height="300px"
            width="100%"
          />
        </div>
      </CardBox>
    </>
  );
};

export default WeeklySchedule;
