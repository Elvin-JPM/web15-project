import React, { useState } from "react";
import Input from "./Input";
import styles from "../ui/filters.module.css";
function Filters({
  name,
  initialMinPrice,
  initialMaxPrice,
  selectedTags,
  sale,
  onChange,
  onTagsChange,
}) {
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    // Convertir el valor a número
    const newValue = parseFloat(value);

    // Actualizar el estado según el nombre del campo
    if (name === "minPrice") {
      setMinPrice(newValue);
      if (newValue > maxPrice) {
        setMaxPrice(newValue);
      }
    } else if (name === "maxPrice") {
      setMaxPrice(newValue);
      if (newValue < minPrice) {
        setMinPrice(newValue);
      }
    }

    // Llamar a la función onChange con los nuevos valores
    onChange(e, { name, value: newValue });
  };

  const tags = ["Motor", "Electronics", "Lifestyle", "Work"];
  return (
    <div className={styles.filters}>
      <div className="flex flex-wrap place-content-around gap-2">
        <div className="">
          <select
            className=" bg-gray-100 rounded-l-lg border-[1px] bg-primary text-sm text-white font-bold p-2 text-wrap text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300"
            name="sale"
            value={sale}
            onChange={onChange}
          >
            <option value="">All</option>
            <option value="Sale">Sale</option>
            <option value="Buy">Buy</option>
          </select>
        </div>
        <div className="col-span-3 grow shrink-0">
          <Input
            className="ml-[-8px] block w-full rounded-r-lg border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
            type="text"
            name="name"
            placeholder="Search"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="flex block max-w-40">
          <div className="">
            <Input
              className=" appearance-none text-right w-full rounded-l-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              type="number"
              name="minPrice"
              placeholder="Min"
              value={minPrice}
              onChange={handlePriceChange}
            />
          </div>
          <div className="">
            <Input
              className="appearance-none w-full rounded-r-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={maxPrice}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="flex inline-block ">
          {tags.map((tag, index) => (
            <div key={index} className="mr-2">
              <label
                htmlFor={tag}
                className="flex cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white px-3 py-2 text-gray-400 hover:border-gray-200 has-[:checked]:border-primary has-[:checked]:primary has-[:checked]:text-gray-700"
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
