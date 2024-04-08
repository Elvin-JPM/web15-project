import React from "react";
import Input from "./Input";

function Filters({
  name,
  minPrice,
  maxPrice,
  selectedTags,
  sale,
  onChange,
  onTagsChange,
}) {
  const tags = ["Motor", "Electronics", "Lifestyle", "Work"];
  return (
    <div className="bg-gray-100 rounded-lg p-2 mb-10">
      <div className="flex flex-wrap place-content-around gap-2">
        <div className="col-span-5 grow shrink-0">
          <Input
            type="text"
            name="name"
            placeholder="Search"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="">
          <select
            className="rounded-md border-0 p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-4 focus:ring-inset focus:ring-secondary"
            name="sale"
            value={sale}
            onChange={onChange}
          >
            <option value="">All</option>
            <option value="Sale">Sale</option>
            <option value="Buy">Buy</option>
          </select>
        </div>
        <div className="">
          <Input
            type="number"
            name="minPrice"
            placeholder="Min price"
            value={minPrice}
            onChange={onChange}
          />
        </div>
        <div className="">
          <Input
            type="number"
            name="maxPrice"
            placeholder="Max price"
            value={maxPrice}
            onChange={onChange}
            maxLength="5"
          />
        </div>
        <div className="flex inline-block p-1 ">
          {tags.map((tag, index) => (
            <div key={index} className="mr-2">
              <label
                htmlFor={tag}
                className="flex cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white px-2 py-1 text-gray-400 hover:border-gray-200 has-[:checked]:border-primary has-[:checked]:primary has-[:checked]:text-gray-700"
              >
                <input
                  type="checkbox"
                  id={tag}
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => onTagsChange(tag)}
                  className="sr-only"
                />
                <p className="text-sm font-medium">{tag}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
