
"use client";
import { Toast } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const TostWithButton = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Toast With Button</h4>
        <Toast>
          <div className="text-sm font-normal">Conversation archived.</div>
          <div className="ml-auto flex items-center space-x-2">
            <a
              href="#"
              className="rounded-lg p-1.5 text-sm font-medium text-primary hover:bg-cyan-100 dark:text-primary dark:hover:bg-gray-700"
            >
              Undo
            </a>
            <Toast.Toggle />
          </div>
        </Toast>
      </CardBox>
    </div>
  );
};

export default TostWithButton;
