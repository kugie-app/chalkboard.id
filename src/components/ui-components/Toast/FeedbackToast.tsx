"use client";
import { Toast } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { FaTelegramPlane } from "react-icons/fa";

const FeedbackToast = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Feedback Toast</h4>
        <Toast>
          <FaTelegramPlane className="h-5 w-5 text-primary dark:text-primary" />
          <div className="pl-4 text-sm font-normal">
            Message sent successfully.
          </div>
        </Toast>
      </CardBox>
    </div>
  );
};

export default FeedbackToast;
