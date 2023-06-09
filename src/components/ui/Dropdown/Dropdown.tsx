import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import Icon from "../../common/Icon";

const LoadingSpinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="h-4 w-4 animate-spin fill-blue-600 text-gray-400 dark:text-gray-100"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const MenuItem = ({
  text,
  icon,
  onClick,
  isLoading,
  isDisabled,
}: {
  text: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <Menu.Item
      disabled={isLoading || false}
      as="button"
      onClick={onClick}
      className={`${
        isDisabled ? "cursor-not-allowed opacity-50 hover:bg-transparent" : ""
      } flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700`}
    >
      {icon}
      {text}
      {isLoading ? <LoadingSpinner /> : null}
    </Menu.Item>
  );
};

const Dropdown = ({
  children,
  customMenuButton,
}: {
  children: React.ReactNode;
  customMenuButton?: React.ReactNode;
}) => {
  if (!children) {
    return null;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-neutral-600">
          {customMenuButton ? (
            customMenuButton
          ) : (
            <>
              <span className="sr-only">Open options</span>
              <Icon name="ellipsisHorizontal" className="h-5 w-5" />
            </>
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 max-h-52 w-56 origin-top-right divide-y divide-gray-100 overflow-y-scroll rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-700 dark:bg-neutral-800">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
