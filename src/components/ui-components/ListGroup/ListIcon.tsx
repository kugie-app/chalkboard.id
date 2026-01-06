"use client";
import React from "react";
import ListIconCode from "./Code/ListIconCode";
import { ListGroup } from "flowbite-react";
import CardBox from "../../shared/CardBox";
import {
  HiCloudDownload,
  HiInbox,
  HiOutlineAdjustments,
  HiUserCircle,
} from "react-icons/hi";
const ListIcon = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">List group with icons</h4>
          <ListIconCode />
        </div>
        <div>
          <ListGroup>
            <ListGroup.Item icon={HiUserCircle} active>
              Profile
            </ListGroup.Item>
            <ListGroup.Item icon={HiOutlineAdjustments}>
              Settings
            </ListGroup.Item>
            <ListGroup.Item icon={HiInbox}>Messages</ListGroup.Item>
            <ListGroup.Item icon={HiCloudDownload}>Download</ListGroup.Item>
          </ListGroup>
        </div>
      </CardBox>
    </div>
  );
};

export default ListIcon;
