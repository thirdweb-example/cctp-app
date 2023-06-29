import styles from "./Logic.module.css";
import { NetworkSlug, NetworkType, Networks } from "../../const/chains";
import { useState } from "react";
import { Approve } from "./Approve";
import {
  useAddress,
  useSigner,
  useSwitchChain,
  useContract,
  useContractRead,
  useChainId,
  ConnectWallet,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { Destination } from "./Destination";
import { BigNumber, ethers, utils } from "ethers";
import { Burn } from "./Burn";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Status } from "../Main";

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

  const [amount, setAmount] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.valueAsNumber)}
        />
        <div className={styles.balanceContainer}>
          <Image src={"/usdc.png"} width={25} height={25} alt="network logo" />
          {isLoading ?
            null
            : (
              <p className={styles.balance}>
                {Number(balance?.displayValue).toFixed(2)} USDC
              </p>
            )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {status === "swap" ? (
          <Destination
            destinationNetwork={destinationNetwork}
            messageBytes={messageBytes}
            attestationSignature={attestationSignature}
            setStatus={setStatus}
          />
        ) : amount > 0 ? (
          usdcAllowance ? (
            formattedAllowance >=
              amount ? (
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
            ) :
              network.usdcContract ? (
                <Approve
                  contractAddress={network.usdcContract}
                  amount={amount}
                  tokenMessengerContract={network.tokenMessengerContract}
                />
              ) : null
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
