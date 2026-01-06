"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { IconMessage, IconVolume } from "@tabler/icons-react";
import { Button, Progress } from "flowbite-react";
import { ToggleSwitch } from "flowbite-react";
import { useState } from "react";

const SettingsCard = () => {
  const [switch1, setSwitch1] = useState(false);
  return (
    <>
      <CardBox>
        <h5 className="card-title">Settings</h5>
        <div className="flex  gap-3 mt-3 border-b border-ld pb-4">
          <div>
            <div className="h-12 w-12 rounded-md bg-primary flex justify-center items-center text-white">
              <IconVolume />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center pb-2">
              <h6 className="text-base">Sound</h6>
              <p className="text-sm text-bodytext">45%</p>
            </div>
            <Progress
              color="primary"
              progress={45}
              size={"md"}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex  gap-3 mt-2 border-b border-ld items-center pb-4">
          <div>
            <div className="h-12 w-12 rounded-md bg-secondary flex justify-center items-center text-white">
              <IconMessage />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div>
                <h6 className="text-base">Chat</h6>
                <p>Turn on chat during call%</p>
              </div>

              <ToggleSwitch
                checked={switch1}
                onChange={setSwitch1}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-2">
          <Button color={'lighterror'}>Cancel</Button>
          <Button color={'primary'}>Save</Button>
        </div>
      </CardBox>
    </>
  );
};

export default SettingsCard;
