import React from "react";
import CardBox from "../../shared/CardBox";
import { List } from "flowbite-react";

const OrderTypo = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Ordered list</h4>
        <List ordered>
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

export default OrderTypo;
