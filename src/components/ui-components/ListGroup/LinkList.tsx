"use client";
import { ListGroup } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import LinkListCode from "./Code/LinkListCode";

const LinkList = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">List items as links</h4>
          <LinkListCode />
        </div>
        <div>
          <ListGroup>
            <ListGroup.Item href="#" active>
              Profile
            </ListGroup.Item>
            <ListGroup.Item href="#">Settings</ListGroup.Item>
            <ListGroup.Item href="#">Messages</ListGroup.Item>
            <ListGroup.Item href="#">Download</ListGroup.Item>
          </ListGroup>
        </div>
      </CardBox>
    </div>
  );
};

export default LinkList;
