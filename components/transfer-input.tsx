import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.css";
import { useAddress } from "@thirdweb-dev/react";

interface TransferInputProps {
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  balance: string;
  balanceLoading: boolean;
}

export const TransferInput: React.FC<TransferInputProps> = ({
  amount,
  setAmount,
  balance,
  balanceLoading,
}) => {
  const address = useAddress();
  return (
    <div className="w-full">
      <label
        htmlFor="transfer-amount"
        className="block text-sm font-medium leading-6 text-gray-400"
      >
        Transfer amount
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="transfer-amount"
          id="transfer-amount"
          className="px-4 py-4 bg-transparent block w-full rounded-md border-0 pr-10 text-gray-200 ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <div className="flex gap-1 justify-center items-center">
            <Image src="/usdc.png" width={18} height={18} alt="network logo" />

            {address ? (
              balanceLoading ? (
                <i className="fas fa-spinner fa-spin fa-xs"></i>
              ) : (
                <p className="text-white text-xs">
                  {Number(balance).toFixed(2)}{" "}
                  <span className="text-gray-500">USDC</span>
                </p>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
