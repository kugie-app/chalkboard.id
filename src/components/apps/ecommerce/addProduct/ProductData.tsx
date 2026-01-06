'use client'
import React, { useState } from "react";
import CardBox from "@/components/shared/CardBox";
import { Button, Label, TextInput } from "flowbite-react";
import { HiOutlinePlusSm, HiOutlineX } from "react-icons/hi";
const ProductData = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const [Cats, setCats] = useState<string[]>([]);
  const [showCatOptions, setShowCatOptions] = useState<boolean>(false);
  const [catOptions, setCatOptions] = useState<string[]>([
    "Computer",
    "Watches",
    "Headphone",
    "Beauty",
    "Fashion",
    "Footwear"
  ]);

  const [showTagOptions, setShowTagOptions] = useState<boolean>(false);
  const [tagOptions, setTagOptions] = useState<string[]>([
    "New",
    "Trending",
    "Headphone",
    "Fashion",
    "Footwear"
  ]);

  const handleCatInputChange = () => {
    setShowCatOptions(true);
  };

  const handleCatInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && Cats.length > 0) {
      setCats([]);
      setShowCatOptions(false);
    }
  };

  const handleCatClick = (option: string) => {
    if (!Cats.includes(option)) {
      setCats([...Cats, option]);
    }
    setShowCatOptions(false);
  };

  const handleCatDelete = (catToDelete: string) => {
    const updatedCats = Cats.filter((cat) => cat !== catToDelete);
    setCats(updatedCats);
  };

  const handleTagInputChange = () => {
    setShowTagOptions(true);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagClick = (option: string) => {
    if (!tags.includes(option)) {
      setTags([...tags, option]);
    }
    setShowTagOptions(false);
  };

  const handleTagDelete = (tagToDelete: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
  };


  return (
    <CardBox>
      <h5 className="card-title mb-4">Product Details</h5>
      <div className="">
        <div className="mb-2 block">
          <Label htmlFor="cat" value="Categories" />
          <span className="text-error ms-1">*</span>
        </div>
        <div className="relative">
          <TextInput
            type="text"
            id="cat"
            onFocus={handleCatInputChange}
            onKeyDown={handleCatInputKeyDown}
            className="form-control"
          />
          <small className="text-xs text-darklink dark:text-bodytext">
            Add product to a category.
          </small>

          <div className=" top-full left-0 mt-1 w-full bg-white dark:bg-dark rounded-md shadow-lg z-10 ">
            {showCatOptions && (
              <div>
                {catOptions.map((option, index) => (
                  <div
                    key={index}
                    className="py-2 px-3 bg-hover cursor-pointer "
                    onClick={() => handleCatClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className=" top-0 left-0 mt-2 mr-2 flex gap-1 flex-wrap">
            {Cats.map((cat, index) => (
              <span
                key={index}
                className="bg-lightprimary py-1 px-2 rounded-full text-primary flex items-center"
              >
                {cat}
                <HiOutlineX
                  onClick={() => handleCatDelete(cat)}
                  className="cursor-pointer ml-1"
                  size={12}
                />
              </span>
            ))}
          </div>
        </div>

      </div>

      <div className="mt-2">
        <Button
          color={"lightprimary"}
          className="w-fit flex items-center gap-2 rounded-xl"
        >
          <HiOutlinePlusSm size={18} /> Add selected category
        </Button>
      </div>

      <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="tags" value="Tags" />
        </div>
        <div className="relative">
          <TextInput
            type="text"
            id="tags"
            onFocus={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="form-control"
          />
          <small className="text-xs text-darklink dark:text-bodytext">Add tags for product.</small>
          <div className=" mt-1 w-full bg-white dark:bg-dark rounded-md shadow-lg z-10">
            {showTagOptions && (
              <div>
                {tagOptions.map((option, index) => (
                  <div
                    key={index}
                    className="py-2 px-3 bg-hover cursor-pointer"
                    onClick={() => handleTagClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className=" mt-2 mr-2 flex gap-1 flex-wrap ">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-lightprimary py-1 px-2 rounded-full text-primary flex items-center"
              >
                {tag}
                <HiOutlineX
                  onClick={() => handleTagDelete(tag)}
                  className="cursor-pointer ml-1"
                  size={12}
                />
              </span>
            ))}
          </div>
        </div>

      </div>
    </CardBox>
  );
};

export default ProductData;
