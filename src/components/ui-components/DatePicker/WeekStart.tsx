"use client";
import { IconCalendarMonth } from "@tabler/icons-react";
import { Datepicker } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const WeekStart = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Week Start</h4>
          <CodeModal>
            {`
    import { Datepicker } from "flowbite-react";
    
    <Datepicker
        weekStart={1} // Monday
        className="form-control"
        icon={() => <IconCalendarMonth size={20} />}
    />
              `}
          </CodeModal>
        </div>

        <Datepicker
          weekStart={1} // Monday
          className="form-control"
          icon={() => <IconCalendarMonth size={20} />}
        />
      </CardBox>
    </div>
  );
};

export default WeekStart;
