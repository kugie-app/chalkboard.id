'use client'
import CardBox from "@/components/shared/CardBox";
import { HiOutlinePlusSm, HiOutlineX } from "react-icons/hi";
import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";

const Variation = () => {

  const [variations, setVariations] = useState([
    { id: 1, type: "Size", value: "" }
  ]);
  const [nextId, setNextId] = useState(2);

  const addVariation = () => {
    const newVariation = { id: nextId, type: "Size", value: "" };
    setVariations([...variations, newVariation]);
    setNextId(nextId + 1);
  };

  const removeVariation = (id: number) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updatedVariations = variations.filter((variance) => variance.id !== id);
      setVariations(updatedVariations);
    }
  };

  const handleValueChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedVariations = variations.map((variance) =>
      variance.id === id ? { ...variance, value: event.target.value } : variance
    );
    setVariations(updatedVariations);
  };

  return (

    <>
      <CardBox>
        <h5 className="card-title mb-4">Variation</h5>
        {variations.map((variation) => (
          <div key={variation.id} className="grid grid-cols-12 md:gap-[30px] gap-5 flex items-end mb-3">
            <div className="md:col-span-4 col-span-12">
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor={`variation-type-${variation.id}`} value="Product Name" />
                  <span className="text-error ms-1">*</span>
                </div>
                <Select id="countries" className="select-md" required>
                  <option selected>Size</option>
                  <option>Color</option>
                  <option>matdash</option>
                  <option>Style</option>
                </Select>
              </div>
            </div>
            <div className="md:col-span-4 col-span-12">
              <TextInput
                type="text"
                sizing="md"
                className="form-control"
                placeholder="Variation"
                value={variation.value}
                onChange={(e) => handleValueChange(variation.id, e)}

              />
            </div>
            <div className="md:col-span-4 col-span-12">
              <Button color={"lighterror"} onClick={() => removeVariation(variation.id)} className="rounded-xl">
                <HiOutlineX size={20} />
              </Button>
            </div>
          </div>
        ))}

        <Button
          color={"lightprimary"}
          className="w-fit flex items-center gap-2 mt-4 rounded-xl"
          onClick={addVariation}
        >
          <HiOutlinePlusSm size={18} /> Add another variation
        </Button>
      </CardBox>
    </>
  );
};

export default Variation;
