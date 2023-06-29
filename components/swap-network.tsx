import { Dispatch, SetStateAction } from "react";
import { NetworkSlug } from "../const/chains";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface SwapNetworkProps {
  sourceNetwork: NetworkSlug;
  setSourceNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  destinationNetwork: NetworkSlug;
  setDestinationNetwork: Dispatch<SetStateAction<NetworkSlug>>;
};

export const SwapNetwork: React.FC<SwapNetworkProps> = ({
  sourceNetwork,
  setSourceNetwork,
  destinationNetwork,
  setDestinationNetwork
}) => {
  const swapNetwork = () => {
    setDestinationNetwork(sourceNetwork);
    setSourceNetwork(destinationNetwork);
  };

  return (
    <div className="relative mx-auto">
      <button className="-top-5 -left-7 absolute rounded-full bg-[#232429] p-2 border-2 border-black" onClick={swapNetwork}>
        <ChevronUpDownIcon className="h-7 w-7 text-gray-400" aria-hidden="true" />
      </button>
    </div>
  );
};

