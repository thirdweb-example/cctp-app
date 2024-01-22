import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface SwapNetworkProps {
  swapNetwork: () => void;
};

export const SwapNetwork: React.FC<SwapNetworkProps> = ({
  swapNetwork,
}) => {
  return (
    <div className="relative mx-auto">
      <button className="-top-4 -left-7 absolute rounded-full bg-[#232429] p-2 border-2 border-black" onClick={swapNetwork}>
        <ChevronUpDownIcon className="text-gray-400 h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  );
};

