"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";
const ButtonWithIcon = () => {
  return (
    <>
      <CardBox>
        <h4 className="text-lg font-semibold">Button with icon</h4>

        <div className="flex flex-wrap gap-2 mt-2">
          <Button color={'primary'}>
            <Icon icon="solar:cart-4-outline" height={18} />
            Buy now
          </Button>
          <Button color={'secondary'}>
            Choose plan
            <Icon icon="solar:adhesive-plaster-outline" height={18} />
          </Button>
          <Button color={'info'}>
            <Icon icon="solar:cart-4-outline" height={18} />
            Buy now
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button color={'success'}>
            <Icon icon="solar:cart-4-outline" height={18} />
            Buy now
          </Button>
          <Button color={'error'}>
            Choose plan
            <Icon icon="solar:arrow-right-outline" height={18} />
          </Button>
          <Button color={'warning'}>
            <Icon icon="solar:cart-4-outline" height={18} />
            Buy now
          </Button>
        </div>
      </CardBox>
    </>
  );
};

export default ButtonWithIcon;
