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
      <label htmlFor="name">Name: </label>
      <Input type="text" name="name" value={name} onChange={onChange} />
      <label htmlFor="sale">Type: </label>
      <select name="sale" value={sale} onChange={onChange}>
        <option></option>
        <option>For sale</option>
        <option>Looking to buy</option>
      </select>
      <br></br>
      <label htmlFor="max-price">Max Price: </label>
      <Input
        type="number"
        name="maxPrice"
        value={maxPrice}
        onChange={onChange}
      />
      <label htmlFor="min-price">Min Price: </label>
      <Input
        type="number"
        name="maxPrice"
        value={minPrice}
        onChange={onChange}
      />
      {tags.map((tag, index) => (
        <div key={index}>
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
  );
}

export default Filters;
