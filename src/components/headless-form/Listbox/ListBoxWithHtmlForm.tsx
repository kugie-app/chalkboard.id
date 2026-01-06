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
import ListBoxWithHtmlCode from "./Codes/ListBoxWithHtmlCode";
const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];
const ListBoxWithHtmlForm = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-lg font-semibold">Using HTML forms</h4>
          <ListBoxWithHtmlCode/>
        </div>
        <form action="/projects/1" method="post " className="flex gap-3">
          <Field className="w-full">
            <Label className="text-sm mb-1 text-ld">Assignee:</Label>
            <Description className="text-xs mb-2">
              This person will have full access to this project.
            </Description>
            <Listbox
              name="assignee"
              value={selectedPerson}
              onChange={setSelectedPerson}
            >
                <span className="flex gap-3">
              <ListboxButton className="ui-button bg-primary  justify-between items-center gap-3 w-full">
                {selectedPerson.name}{" "}
                <Icon icon="solar:alt-arrow-down-outline" height={18} />
              </ListboxButton>
              <button className="ui-button bg-secondary">Submit</button>
              </span>
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
        </form>
      </CardBox>
    </div>
  );
};

export default ListBoxWithHtmlForm;
