"use client";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import CardBox from "../../shared/CardBox";

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

const BindingStringAsValue = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  const handleSelection = (person: any) => {
    setSelectedPerson(person);
    setQuery(""); // Reset query after selection
  };

  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Binding Values</h4>
        </div>
        <Combobox value={selectedPerson} onChange={handleSelection}>
          <ComboboxInput
            aria-label="Assignee"
            onChange={(event) => setQuery(event.target.value)}
            value={query} // Bind input to the query state
            className="w-full ui-form-control rounded-md"
          />
          <ComboboxOptions
            anchor="bottom"
            className="origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible"
          >
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person}
                value={person}
                className="group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary"
              >
                {person}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      </CardBox>
    </div>
  );
};

export default BindingStringAsValue;
