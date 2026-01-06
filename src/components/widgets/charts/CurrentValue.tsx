import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";
import OutlineCard from "../../shared/OutlineCard";
import IncomeChart from "./IncomeChart";
import ExpnaceChart from "./ExpnaceChart";
import CurrentYear from "./CurrentYear";

const CurrentValue = () => {
  return (
    <>
      <CardBox>
        <div className="flex justify-between items-end">
          <h5 className="card-title">Current Value</h5>
          <div className="flex gap-3">
            <Button color={"primary"}>Buy</Button>
            <Button color={"outlineprimary"}>Sell</Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-[30px] mt-6">
          <div className="lg:col-span-4 col-span-12">
            <OutlineCard className="shadow-none">
                <IncomeChart/>
            </OutlineCard>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <OutlineCard className="shadow-none">
                <ExpnaceChart/>
            </OutlineCard>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <OutlineCard className="shadow-none">
                <CurrentYear/>
            </OutlineCard>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default CurrentValue;
