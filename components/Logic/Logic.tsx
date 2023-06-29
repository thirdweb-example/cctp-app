import { NetworkSlug, Networks } from "../../const/chains";
import { useState } from "react";
import { Approve } from "./Approve";
import {
  useAddress,
  useContract,
  useContractRead,
  ConnectWallet,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { Destination } from "./Destination";
import { BigNumber, utils } from "ethers";
import { Burn } from "./Burn";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Status } from "../../const/types";
import { TransferInput } from "../transfer-input";

interface LogicProps {
  sourceNetwork: NetworkSlug;
  destinationNetwork: NetworkSlug;
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
};

export const Logic: React.FC<LogicProps> = ({
  sourceNetwork,
  destinationNetwork,
  status,
  setStatus,
}) => {
  const [messageBytes, setMessageBytes] = useState("");
  const [attestationSignature, setAttestationSignature] = useState("");
  const address = useAddress();

  const network = Networks[sourceNetwork];
  const { contract: usdcContract } = useContract(network.usdcContract);
  const { data: usdcAllowance } = useContractRead(usdcContract, "allowance", [
    address,
    network.tokenMessengerContract,
  ]);
  const formattedAllowance = Number(utils.formatUnits(usdcAllowance || BigNumber.from(0), 6));
  const { data: balance, isLoading } = useTokenBalance(usdcContract, address);

  const [amount, setAmount] = useState("0.00");

  return (
    <div className="w-full">
      <TransferInput
        amount={amount}
        setAmount={setAmount}
        balance={Number(balance?.displayValue).toFixed(2) || "0.00"}
      />
      <div className="">
        {status === "swap" ? (
          <Destination
            destinationNetwork={destinationNetwork}
            messageBytes={messageBytes}
            attestationSignature={attestationSignature}
            setStatus={setStatus}
          />
        ) : Number(amount) > 0 ? (
          usdcAllowance ? (
            formattedAllowance >=
                Number(amount) ? (
              <div>
                {(!attestationSignature || !messageBytes) && (
                  <div>
                    <Burn
                      network={network}
                      destinationNetwork={destinationNetwork}
                      amount={amount}
                      setMessageBytes={setMessageBytes}
                      setAttestationSignature={setAttestationSignature}
                      setStatus={setStatus}
                    />
                  </div>
                )}
              </div>
              ) : (
                <Approve
                  contractAddress={network.usdcContract}
                  amount={amount}
                  tokenMessengerContract={network.tokenMessengerContract}
                />
                )
          ) : null
        ) : (
          <p>Enter a USDC Amount to Swap</p>
        )
        }
        {!address && <ConnectWallet />}
      </div>
    </div>
  );
};
