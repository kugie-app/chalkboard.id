"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

const TransitionListBox = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Listbox With Transitions</h4>
        </div>
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <ListboxButton className="ui-button bg-primary justify-between items-center gap-3">{selectedPerson.name} <Icon icon="solar:alt-arrow-down-outline" height={18} /></ListboxButton>
          <ListboxOptions anchor="bottom" transition className="ui-dropdown origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
            {people.map((person) => (
              <ListboxOption
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

export default TransitionListBox;
