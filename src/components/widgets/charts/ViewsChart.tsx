"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ViewsChart = () => {
  const ChartData: any = {
    series: [
        {
            name: '',
            data: [20, 15, 30, 25, 10, 18, 20, 15, 12, 10]
        }
    ],
    chart: {
        type: 'bar',
        height: 80,
        fontFamily: `inherit`,
        sparkline: {
            enabled: true
        }
    },
    colors: ['var(--color-lightsecondary)', 'var(--color-lightsecondary)', 'var(--color-secondary)', 'var(--color-lightsecondary)', 'var(--color-lightsecondary)', 'var(--color-lightsecondary)'],

    plotOptions: {
        bar: {
            borderRadius: 4,
            columnWidth: '50%',
            distributed: true,
            endingShape: 'rounded'
        }
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
    xaxis: {
        categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        labels: {
            show: false
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        labels: {
            show: false
        }
    },
    tooltip: {
        theme: 'dark'
    }
  };
  return (
    <>
      <CardBox className="overflow-hidden">
        <div className="flex justify-between items-end">
          <div>
            <h5 className="card-title">15,480</h5>
            <p className="card-subtitle">Views</p>
          </div>
          <span className="text-error text-sm">-4.150%</span>
        </div>

        <Chart
          options={ChartData}
          series={ChartData.series}
          type="bar"
          height='80px'
          width='100%'
          className="mt-2"
        />
      </CardBox>
    </>
  );
};

export default ViewsChart;
