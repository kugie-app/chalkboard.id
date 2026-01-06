"use client";
import { IconCalendarMonth } from "@tabler/icons-react";
import { Datepicker } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const LimitDatep = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Limit The Date</h4>
          <CodeModal>
            {`
    import { Datepicker } from "flowbite-react";
    
    <Datepicker
        minDate={new Date(2023, 0, 1)}
        maxDate={new Date(2023, 3, 30)}
        className="form-control"
        icon={() => <IconCalendarMonth size={20} />}
    />
              `}
          </CodeModal>
        </div>

        <Datepicker
          minDate={new Date(2023, 0, 1)}
          maxDate={new Date(2023, 3, 30)}
          className="form-control"
          icon={() => <IconCalendarMonth size={20} />}
        />
      </CardBox>
    </div>
  );
};

export default LimitDatep;
