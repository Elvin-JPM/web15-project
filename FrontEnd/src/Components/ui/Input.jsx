import Label from "./Label";

export function Input({ errorMessage, ...props }) {
  return (
    <div className="col-span-12">
      <Label>{props.label}</Label>
      <input
        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
        {...props}
      />
    </div>
  );
}

export default Input;
