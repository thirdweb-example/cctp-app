import { cn } from "../lib/utils";
import { Dispatch, SetStateAction } from "react";

interface TestnetMainnetSelectorProps {
  isTestnet: boolean;
  setIsTestnet: Dispatch<SetStateAction<boolean>>;
};

export const TestnetMainnetSelector: React.FC<TestnetMainnetSelectorProps> = ({ setIsTestnet, isTestnet }) => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className={cn("rounded-full text-gray-400 px-3 py-1.5 text-sm font-semibold shadow-sm ring-2 ring-inset ring-gray-400", isTestnet ? "ring-blue-500 text-blue-500" : "hover:opacity-80")}
        onClick={() => setIsTestnet(true)}
      >
        Testnet
      </button>
      <button
        type="button"
        className={cn("rounded-full text-gray-400 px-3 py-1.5 text-sm font-semibold shadow-sm ring-2 ring-inset ring-gray-400", !isTestnet ? "ring-blue-500 text-blue-500" : "hover:opacity-80")}
        onClick={() => setIsTestnet(false)}
      >
        Mainnet
      </button>
    </div>
  );
};
