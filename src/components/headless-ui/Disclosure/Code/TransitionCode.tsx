import CodeModal from "@/components/ui-components/CodeModal";
import React from "react";

const TransitionCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import React from "react";
    import CardBox from "../../shared/CardBox";
    import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    } from "@headlessui/react";
    import { Icon } from "@iconify/react";
    <div className="mx-auto w-full max-w-lg divide-y divide-border dark:divide-darkborder rounded-xl bg-lightgray dark:bg-dark">
        <Disclosure as="div" className="py-4 px-6" defaultOpen={true}>
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
        <DisclosurePanel
            transition
            className="mt-2 text-xs text-bodytext origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete
            text) is dummy text that is not meant to mean anything. It is used
            as a placeholder in magazine layouts, for example, in order to
            give an impression of the finished document. The text is
            intentionally unintelligible so that the viewer is not distracted
            by the content
        </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="py-4 px-6">
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
        <DisclosurePanel
            transition
            className="mt-2 text-xs text-bodytext origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete
            text) is dummy text that is not meant to mean anything. It is used
            as a placeholder in magazine layouts, for example, in order to
            give an impression of the finished document. The text is
            intentionally unintelligible so that the viewer is not distracted
            by the content
        </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="py-4 px-6">
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
        <DisclosurePanel
            transition
            className="mt-2 text-xs text-bodytext origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        >
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete
            text) is dummy text that is not meant to mean anything. It is used
            as a placeholder in magazine layouts, for example, in order to
            give an impression of the finished document. The text is
            intentionally unintelligible so that the viewer is not distracted
            by the content
        </DisclosurePanel>
        </Disclosure>
    </div>
        
        `}
      </CodeModal>
    </div>
  );
};

export default TransitionCode;
