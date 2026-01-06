"use client";
import { ListGroup } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import DefaultListcode from "./Code/DefaultListCode";

const DefaultList = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Default list group</h4>
          <DefaultListcode />
        </div>
        <div>
          <ListGroup>
            <ListGroup.Item>Profile</ListGroup.Item>
            <ListGroup.Item>Settings</ListGroup.Item>
            <ListGroup.Item>Messages</ListGroup.Item>
            <ListGroup.Item disabled>Download</ListGroup.Item>
          </ListGroup>
        </div>
      </CardBox>
    </div>
  );
};

export default DefaultList;
