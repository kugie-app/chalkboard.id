"use client";
import { useState } from "react";
import CardBox from "../../shared/CardBox";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
  // +1000 more people
];

const VirtualScrollingCombo = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Virtual Scrolling</h4>
        <Combobox
          value={selectedPerson}
          virtual={{ options: filteredPeople }}
          onChange={() => setSelectedPerson}
          onClose={() => setQuery("")}
        >
          <ComboboxInput
            aria-label="Assignee"
            displayValue={(person: any) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full ui-form-control rounded-md"
          />
          <ComboboxOptions
            anchor="bottom"
            className="origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible"
          >
            {({ option: person }) => (
              <ComboboxOption
                value={person}
                className="group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary"
              >
                {person.name}
              </ComboboxOption>
            )}
          </ComboboxOptions>
        </Combobox>
      </CardBox>
    </>
  );
};

export default VirtualScrollingCombo;
