"use client";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import {
  Field,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Label,
} from "@headlessui/react";
import ComboWithLableCode from "./Codes/ComboWithLableCode";
import DisableComboOptCode from "./Codes/DisableComboOptCode";

// Define the type for the person object
interface Person {
  id: number;
  name: string;
  available: boolean;
}

const people: Person[] = [
  { id: 1, name: "Durward Reynolds", available: true },
  { id: 2, name: "Kenton Towne", available: true },
  { id: 3, name: "Therese Wunsch", available: true },
  { id: 4, name: "Benedict Kessler", available: false },
  { id: 5, name: "Katelyn Rohan", available: true },
];

const DisableComboOption = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(
    people[0]
  );
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Disabled Combo Option</h4>
          <DisableComboOptCode/>
        </div>
        <Field className="flex gap-3  items-center">
          <Label className="text-ld">Assignee:</Label>
          <Combobox
            value={selectedPerson}
            onChange={setSelectedPerson}
            onClose={() => setQuery("")}
          >
            <ComboboxInput
              displayValue={(person: Person | null) =>
                person ? person.name : ""
              }
              onChange={(event) => setQuery(event.target.value)}
              className="w-full ui-form-control rounded-md"
            />
            <ComboboxOptions
              anchor="bottom"
              className="absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible"
            >
              {filteredPeople.map((person) => (
                <ComboboxOption
                  key={person.id}
                  value={person}
                  disabled={!person.available}
                  className="group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary  data-[disabled]:opacity-50 data-[disabled]:hover:text-bodytext"
                >
                  {person.name}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
        </Field>
      </CardBox>
    </div>
  );
};

export default DisableComboOption;
