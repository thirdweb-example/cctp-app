import React from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { Status } from "../const/types";

export interface ModalProps {
  children: React.ReactNode;
  setStatus: Dispatch<SetStateAction<Status>>;
  status: Status;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  setStatus,
  status,
}) => {
  return (
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="relative bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={() => setStatus("idle")}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="sm:flex  sm:items-center content-center justify-center">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
            <div className="mt-2 justify-center">
              <p className="text-sm text-gray-500">
                {status === "burn" ? (
                  <div>
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 m-4"
                      id="modal-title"
                    >
                      Step 1: Burn USDC on Source Chain
                    </h3>
                    <p>
                      <li>
                        The Token Messenger contract is approved to burn USDC on
                        the source chain
                      </li>
                      <li>
                        The Token Messenger contract burns USDC on the source
                        chain & the message bytes are retrieved from the logs
                      </li>
                      <li>
                        Using the message hash, an API is called to attest the
                        signature
                      </li>
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 p-1"
                      id="modal-title"
                    >
                      Step 2: Mint USDC on Destination Chain
                    </h3>
                    <p>
                      <li>Switch to the destination chain</li>
                      <li>USDC is minted on the destination network</li>
                    </p>
                  </div>
                )}
              </p>
            </div>
            <div className="mt-2">
              <div className="p-4">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
