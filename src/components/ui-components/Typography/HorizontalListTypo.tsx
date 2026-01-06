import { List } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const HorizontalListTypo = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold">Horizontal list</h4>
        <List horizontal>
          <List.Item>About</List.Item>
          <List.Item>Premium</List.Item>
          <List.Item>Campaigns</List.Item>
          <List.Item>Blog</List.Item>
          <List.Item>Affiliate Program</List.Item>
          <List.Item>FAQs</List.Item>
          <List.Item>Contact</List.Item>
        </List>
      </CardBox>
    </div>
  );
};

export default HorizontalListTypo;
