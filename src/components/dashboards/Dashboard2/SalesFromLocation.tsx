"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Progress } from "flowbite-react";

import VectorMap, {
  Layer,
  Tooltip,
  LoadingIndicator,
  Size,
} from "devextreme-react/vector-map";

const markers = [
  {
    coordinates: [-118.245003, 34.053501],
    attributes: {
      name: "Los Angeles",
    },
  },
  {
    coordinates: [-74.007118, 40.71455],
    attributes: {
      name: "New York",
    },
  },
  {
    coordinates: [-84.423058, 33.763191],
    attributes: {
      name: "Atlanta",
    },
  },
  {
    coordinates: [-87.632408, 41.884151],
    attributes: {
      name: "Chicago",
    },
  },
];

const mapsData = require("devextreme/dist/js/vectormap-data/usa.js");
const bounds = [-110, 52, -80, 20];
function TooltipTemplate(info: any) {
  const name = info.attribute("name");

  return (
    <>
      <div>{info.attribute("name")}</div>
    </>
  );
}

const SalesFromLocation = () => {
  const SalesFromLocationData = [
    {
      name: "LA",
      percentage: 28,
      color: "primary",
    },
    {
      name: "NY",
      percentage: 21,
      color: "secondary",
    },
    {
      name: "KA",
      percentage: 18,
      color: "warning",
    },
    {
      name: "AZ",
      percentage: 12,
      color: "error",
    },
  ];
  return (
    <>
      <CardBox className=""> 
        <div>
          <h5 className="card-title">Sales from Locations</h5>
          <p className="card-subtitle">United Stats</p>

          <div className="mt-6">
            <VectorMap id="vector-map" height={240} bounds={bounds}>
              <Size height={220} width="100%" />
              <Layer
                dataSource={mapsData.usa}
                hoverEnabled={true}
                borderColor="#ffffff"
              ></Layer>
              <Layer dataSource={markers} />

              <LoadingIndicator show={false} />
              <Tooltip enabled={false} contentRender={TooltipTemplate} />
            </VectorMap>
          </div>

          <div className="">
            {SalesFromLocationData.map((item, index) => (
              <div
                className="grid grid-cols-12 gap-[15px] items-center mb-4"
                key={index}
              >
                <div className="xl:col-span-2 lg:col-span-2 sm:col-span-2 col-span-2">
                  <h6 className="text-sm">{item.name}</h6>
                </div>
                <div className="xl:col-span-8 lg:col-span-6  col-span-7">
                  <Progress
                    progress={item.percentage}
                    color={`${item.color}`}
                    size={"md"}
                  />
                </div>
                <div className="xl:col-span-2 lg:col-span-3 sm:col-span-3  col-span-3 text-end">
                  <h6 className="text-sm opacity-80">{item.percentage}%</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default SalesFromLocation;
