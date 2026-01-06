"use client";
import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import CardBox from "@/components/shared/CardBox";
import { Icon } from "@iconify/react";
import FramerMotionCode from "./Code/FramerMotionCode";
const FramerDiclosure = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">
            Disclosure With Framer Motion
          </h4>
          <FramerMotionCode />
        </div>
        <div className="mx-auto w-full  divide-y divide-border dark:divide-darkborder rounded-xl bg-lightgray dark:bg-dark">
          <Disclosure as="div" className="py-4 px-6">
            {({ open }) => (
              <>
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-sm font-medium text-ld group-data-[hover]:text-primary">
                    What is your refund policy?
                  </span>
                  <Icon
                    icon="solar:alt-arrow-down-outline"
                    height={18}
                    className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"
                  />
                </DisclosureButton>
                <div className="overflow-hidden">
                  <AnimatePresence>
                    {open && (
                      <DisclosurePanel
                        static
                        as={motion.div}
                        initial={{ opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        className="origin-top text-xs mt-2 text-bodytext"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipisici elit…’
                        (complete text) is dummy text that is not meant to mean
                        anything. It is used as a placeholder in magazine
                        layouts,Lorem ipsum dolor sit amet, consectetur
                        adipisici elit…’ (complete text) is dummy text that is
                        not meant to mean anything. It is used as a placeholder
                        in magazine layouts,
                      </DisclosurePanel>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="py-4 px-6">
            {({ open }) => (
              <>
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-sm font-medium text-ld group-data-[hover]:text-primary">
                    Can I reserve a magazine?
                  </span>
                  <Icon
                    icon="solar:alt-arrow-down-outline"
                    height={18}
                    className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"
                  />
                </DisclosureButton>
                <div className="overflow-hidden">
                  <AnimatePresence>
                    {open && (
                      <DisclosurePanel
                        static
                        as={motion.div}
                        initial={{ opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        className="origin-top text-xs text-bodytext mt-2"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipisici elit…’
                        (complete text) is dummy text that is not meant to mean
                        anything. It is used as a placeholder in magazine
                        layouts,Lorem ipsum dolor sit amet, consectetur
                        adipisici elit…’ (complete text) is dummy text that is
                        not meant to mean anything. It is used as a placeholder
                        in magazine layouts,
                      </DisclosurePanel>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="py-4 px-6">
            {({ open }) => (
              <>
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-sm font-medium text-ld group-data-[hover]:text-primary">
                    Do I have the right to return an item?
                  </span>
                  <Icon
                    icon="solar:alt-arrow-down-outline"
                    height={18}
                    className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"
                  />
                </DisclosureButton>
                <div className="overflow-hidden">
                  <AnimatePresence>
                    {open && (
                      <DisclosurePanel
                        static
                        as={motion.div}
                        initial={{ opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        className="origin-top text-xs text-bodytext mt-2"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipisici elit…’
                        (complete text) is dummy text that is not meant to mean
                        anything. It is used as a placeholder in magazine
                        layouts,Lorem ipsum dolor sit amet, consectetur
                        adipisici elit…’ (complete text) is dummy text that is
                        not meant to mean anything. It is used as a placeholder
                        in magazine layouts,
                      </DisclosurePanel>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </Disclosure>
        </div>
      </CardBox>
    </div>
  );
};

export default FramerDiclosure;
