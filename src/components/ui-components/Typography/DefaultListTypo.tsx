import { List } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const DefaultListTypo = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Default list</h4>
        <List>
          <List.Item>
            At least 10 characters (and up to 100 characters)
          </List.Item>
          <List.Item>At least one lowercase character</List.Item>
          <List.Item>
            Inclusion of at least one special character, e.g., ! @ # ?
          </List.Item>
        </List>
      </CardBox>
    </div>
  );
};

export default DefaultListTypo;
