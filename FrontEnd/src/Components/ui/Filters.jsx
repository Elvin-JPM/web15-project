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
    <div>
      <p>Filters: </p>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4 mr-4">
          <label htmlFor="name">Name: </label>
          <Input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="w-full md:w-1/4 mr-4">
          <label htmlFor="sale">Type: </label>
          <select name="sale" value={sale} onChange={onChange}>
            <option></option>
            <option>For sale</option>
            <option>Looking to buy</option>
          </select>
        </div>
        <div className="w-full md:w-1/4 mr-4">
          <label htmlFor="max-price">Max Price: </label>
          <Input type="number" name="maxPrice" value={maxPrice} onChange={onChange} />
        </div>
        <div className="w-full md:w-1/4 mr-4">
          <label htmlFor="min-price">Min Price: </label>
          <Input type="number" name="minPrice" value={minPrice} onChange={onChange} />
        </div>
      </div>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <div key={index} className="mr-4">
            <input
              type="checkbox"
              id={tag}
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={() => onTagsChange(tag)}
            />
            <label htmlFor={tag}>{tag}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
