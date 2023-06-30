import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

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

            {balanceLoading ? (
              <div className="w-screen h-screen fixed block top-0 left-0 bg-white opacity-75 z-50">
                <span
                  className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
                  style={{ top: "50%" }}
                >
                  <i className="fas fa-circle-notch fa-spin fa-5x"></i>
                </span>
              </div>
            ) : (
              <p className="text-white text-xs">
                {Number(balance).toFixed(2)}{" "}
                <span className="text-gray-500">USDC</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
