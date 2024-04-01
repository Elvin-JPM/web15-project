import storage from "../Api/storage";

const getFromStorage = (value) => {
  const fromLocalStorage = storage.get(value);
  const fromSessionStorage = sessionStorage.getItem(value);
  const item = fromLocalStorage || fromSessionStorage;
  return item ? item : "";
};

export default getFromStorage;
