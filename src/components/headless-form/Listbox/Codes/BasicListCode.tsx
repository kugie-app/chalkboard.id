import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const BasicListCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    } from "@headlessui/react";
    import { useState } from "react";
    import { Icon } from "@iconify/react";

    const people = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
    ];    

    const [selectedPerson, setSelectedPerson] = useState(people[0]);

    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <ListboxButton className="ui-button bg-primary justify-between items-center gap-3">{selectedPerson.name} <Icon icon="solar:alt-arrow-down-outline" height={18} /></ListboxButton>
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
        `}
      </CodeModal>
    </div>
  )
}

export default BasicListCode
