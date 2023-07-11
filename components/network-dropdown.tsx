import { NetworkSlug, Networks, NetworkList } from "../const/chains";
import { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface NetworkDropdown {
  heading: "From" | "To";
  swapNetwork: () => void;
  network: NetworkSlug;
  setNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  forbiddenNetwork: NetworkSlug;
}

export const NetworkDropdown: React.FC<NetworkDropdown> = ({
  heading,
  swapNetwork,
  network,
  setNetwork,
  forbiddenNetwork,
}) => {
  const fullNetwork = Networks[network];

  return (
    <div className="p-3 rounded-xl bg-[#232429] mx-auto flex flex-col gap-2 w-full">
      <span className="block text-sm font-medium leading-6 text-gray-400">
        {heading}
      </span>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex gap-4 w-full gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:opacity-80">
            <div className="flex justify-between w-full">
              <div className="flex gap-2 items-center">
                <MediaRenderer
                  src={fullNetwork.src}
                  width="24px"
                  height="24px"
                />
                {fullNetwork.name}
              </div>
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-[#232429] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {NetworkList.map(({ network: ntwr }) => (
                <Menu.Item key={ntwr.slug}>
                  <button
                    onClick={() => {
                      if (ntwr.slug === forbiddenNetwork) {
                        swapNetwork();
                      } else {
                        setNetwork(ntwr.slug as NetworkSlug);
                      }
                    }}
                    className="group w-full hover:opacity-90 flex items-center px-4 py-2 text-white text-sm"
                  >
                    {ntwr.name}
                  </button>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
