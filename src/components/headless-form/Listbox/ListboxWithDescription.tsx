"use client";
import {
  Description,
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
import ListDescCode from "./Codes/ListDescCode";

const people = [
  { id: 1, name: "Durward Reynolds", available: true },
  { id: 2, name: "Kenton Towne", available: true },
  { id: 3, name: "Therese Wunsch", available: false },
  { id: 4, name: "Benedict Kessler", available: false },
  { id: 5, name: "Katelyn Rohan", available: true },
];

const ListboxWithDescription = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Listbox With Description</h4>
          <ListDescCode />
        </div>
        <Field className="w-full">
          <Description className="text-xs mb-2">
            This person will have full access to this project. This person will
            have full access to this project.
          </Description>
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <ListboxButton className="ui-button bg-warning  justify-between items-center gap-3 w-full">
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

export default ListboxWithDescription;
