"use client";
import { Button, Toast } from "flowbite-react";
import React, { useState } from "react";
import { HiFire } from "react-icons/hi";
import CardBox from "../../shared/CardBox";

const DismissalToast = () => {
    const [showToast, setShowToast] = useState(false);
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Dismissal Toast</h4>
        <div className="space-y-4">
          <Button
            onClick={() => setShowToast((state) => !state)}
            color="primary"
          >
            Toggle toast
          </Button>
          {showToast && (
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                <HiFire className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">Set yourself free.</div>
              <Toast.Toggle onDismiss={() => setShowToast(false)} />
            </Toast>
          )}
        </div>
      </CardBox>
    </div>
  );
};

export default DismissalToast;
