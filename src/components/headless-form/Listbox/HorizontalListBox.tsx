

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

const HorizontalListBox = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Horizontal Listbox</h4>
        </div>
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <ListboxButton className="ui-button bg-info justify-between items-center gap-3">{selectedPerson.name} <Icon icon="solar:alt-arrow-down-outline" height={18} /></ListboxButton>
          <ListboxOptions anchor="bottom" className="ui-dropdown w-80 !max-w-80 flex flex-row">
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

export default HorizontalListBox;
