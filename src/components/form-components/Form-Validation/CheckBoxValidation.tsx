"use client";
import { Checkbox, Button } from "flowbite-react";
import React, { useState } from "react";
import TitleCard from "../../shared/TitleBorderCard";

const CheckBoxValidation = () => {
  // Checkbox
  const [checkboxStates, setCheckboxStates] = useState({
    primary: false,
    secondary: false,
    error: false,
  });

  const [error, setError] = useState("");

  const handleCheckboxChange = (event: {
    target: { id: any; checked: any };
  }) => {
    const { id, checked } = event.target;
    setCheckboxStates((prevState) => ({
      ...prevState,
      [id]: checked,
    }));

    // Clear error message when a checkbox is checked
    if (checked) {
      setError("");
    }
  };

  const handleSubmitcheck = () => {
    const { primary, secondary, error } = checkboxStates;

    const selectedColors = [];
    if (primary) selectedColors.push("Primary");
    if (secondary) selectedColors.push("Secondary");
    if (error) selectedColors.push("Error");

    if (selectedColors.length > 0) {
      alert(selectedColors.join(", "));
    } else {
      setError("At least one checkbox must be checked");
    }
  };
  return (
    <div>
      <TitleCard title="Checkboxes">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center gap-5">
            <Checkbox
              className="checkbox"
              id="primary"
              color="primary"
              checked={checkboxStates.primary}
              onChange={handleCheckboxChange}
            />
            <Checkbox
              className="checkbox"
              id="secondary"
              color="secondary"
              checked={checkboxStates.secondary}
              onChange={handleCheckboxChange}
            />
            <Checkbox
              className="checkbox"
              id="error"
              color="error"
              checked={checkboxStates.error}
              onChange={handleCheckboxChange}
            />
          </div>
          {error && <div className="col-span-12 text-red-500">{error}</div>}
          <div className="col-span-12 flex items-center gap-[1rem] justify-end">
            <Button
              type="submit"
              color="primary"
              className="rounded-md"
              onClick={handleSubmitcheck}
            >
              Submit
            </Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default CheckBoxValidation;
