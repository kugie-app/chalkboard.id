"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  CloseButton,
} from "@headlessui/react";
import React from "react";
import CardBox from "../../shared/CardBox";
import MyCustomLink from "./MyLink";
import { Icon } from "@iconify/react";
import ClosingDisclosureCode from "./Code/ClosingDisclosureCode";
const DisclosureManually = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">
            Closing Disclosures Manually
          </h4>
          <ClosingDisclosureCode />
        </div>

        <Disclosure>
          <DisclosureButton className="group bg-primary ui-button">
            Open mobile menu
            <Icon
              icon="solar:alt-arrow-down-outline"
              height={18}
              className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"
            />
          </DisclosureButton>
          <DisclosurePanel className="px-4 py-1">
            <CloseButton as={MyCustomLink}>Go with your link</CloseButton>
          </DisclosurePanel>
        </Disclosure>
      </CardBox>
    </div>
  );
};

export default DisclosureManually;
