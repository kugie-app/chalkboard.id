"use client";
import { forwardRef, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

type MyCustomButtonProps = React.ComponentPropsWithoutRef<"button">;

let MyCustomButton = forwardRef<HTMLButtonElement, MyCustomButtonProps>(
  function MyCustomButton(props, ref) {
    return <button ref={ref} {...props} />;
  }
);
const RenderingAsDiffElemtns = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Rendering as Different Elements </h4>
        </div>
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <ListboxButton
            as={MyCustomButton}
            className="ui-button bg-error justify-between items-center gap-3"
          >
            {selectedPerson.name}{" "}
            <Icon icon="solar:alt-arrow-down-outline" height={18} />
          </ListboxButton>
          <ListboxOptions anchor="bottom" as="ul" className="ui-dropdown">
            {people.map((person) => (
              <ListboxOption
                as="li"
                key={person.id}
                value={person}
                className="ui-dropdown-item"
              >
                {person.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </CardBox>
    </div>
  );
};

export default RenderingAsDiffElemtns;
