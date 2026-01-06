"use client";
import CardBox from "../../shared/CardBox";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@iconify/react";
const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

const ListboxFramerMotion = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Listbox With Framer Motion </h4>
        </div>
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          {({ open }) => (
            <>
              <ListboxButton className="ui-button bg-secondary justify-between items-center gap-3">
                {selectedPerson.name} <Icon icon="solar:alt-arrow-down-outline" height={18} />
              </ListboxButton>
              <AnimatePresence>
                {open && (
                  <ListboxOptions
                    static
                    as={motion.div}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    anchor="bottom"
                    className="origin-top ui-dropdown "
                  >
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
                )}
              </AnimatePresence>
            </>
          )}
        </Listbox>
      </CardBox>
    </div>
  );
};

export default ListboxFramerMotion;
