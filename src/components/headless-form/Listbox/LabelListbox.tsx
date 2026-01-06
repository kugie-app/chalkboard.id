"use client";
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import LabelWithListcode from "./Codes/LabelWithListcode";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

const LabelListbox = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Label With Listbox</h4>
          <LabelWithListcode />
        </div>
        <Field className="flex gap-3 items-center w-full">
          <Label className="block text-ld font-medium">Assignee:</Label>
          <Listbox value={selectedPerson} onChange={setSelectedPerson} >
            <ListboxButton className="ui-button bg-secondary justify-between items-center gap-3 w-full">
              {selectedPerson.name}{" "}
              <Icon icon="solar:alt-arrow-down-outline" height={18} />
            </ListboxButton>
            <ListboxOptions anchor="bottom" className="ui-dropdown">
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
        </Field>
      </CardBox>
    </div>
  );
};

export default LabelListbox;
