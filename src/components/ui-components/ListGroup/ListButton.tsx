"use client";
import React from "react";
import ListButtonCode from "./Code/ListButtonCode";
import { ListGroup } from "flowbite-react";
import CardBox from "../../shared/CardBox";

const ListButton = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">List group with buttons</h4>
          <ListButtonCode />
        </div>
        <div>
          <ListGroup>
            <ListGroup.Item onClick={() => alert("Profile clicked!")} active>
              Profile
            </ListGroup.Item>
            <ListGroup.Item>Settings</ListGroup.Item>
            <ListGroup.Item>Messages</ListGroup.Item>
            <ListGroup.Item>Download</ListGroup.Item>
          </ListGroup>
        </div>
      </CardBox>
    </div>
  );
};

export default ListButton;
