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
];

const ActiveOptionDetails = () => {
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
        <h4 className="text-lg font-semibold mb-2">
          Rendering Active Option Details
        </h4>
        <Combobox
          value={selectedPerson}
          onChange={() => setSelectedPerson}
          onClose={() => setQuery("")}
        >
          {({ activeOption }) => (
            <>
              <ComboboxInput
                aria-label="Assignee"
                displayValue={(person:any) => person?.name}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full ui-form-control rounded-md"
              />
              <ComboboxOptions
                anchor="top"
                className="origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible"
              >
                {filteredPeople.map((person) => (
                  <ComboboxOption
                    key={person.id}
                    value={person}
                    className="group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary"
                  >
                    {person.name}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
              {activeOption && (
                <p className="text-ld">The currently focused user is: <b>{activeOption.name}</b></p>
              )}
            </>
          )}
        </Combobox>
      </CardBox>
    </>
  );
};

export default ActiveOptionDetails;
