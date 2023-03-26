import { type InputHTMLAttributes } from "react";

import Icon from "~/components/common/Icon";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClick?: () => void;
  isDisabled?: boolean;
}

const SearchInput = ({
  onClick,
  isDisabled = false,
  ...inputProps
}: SearchInputProps) => {
  return (
    <div className="mt-2 w-full sm:col-span-2">
      <div className="flex w-full rounded-md shadow-sm">
        <input
          {...inputProps}
          type="text"
          name="Tracking number"
          id="trackingNumber"
          placeholder="Tracking number"
          className="w-full appearance-none rounded-l-md p-3 text-sm leading-tight text-gray-700 placeholder:text-sm focus:outline-none"
        />

        <button
          onClick={onClick}
          disabled={isDisabled}
          className={`inline-flex items-center rounded-r-md bg-indigo-500 py-2 px-4 transition-all hover:brightness-95 disabled:pointer-events-none disabled:opacity-50 sm:text-sm`}
        >
          <Icon name="magnifyingGlass" className="h-5 w-5 text-indigo-100" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
