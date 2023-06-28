import styles from "./Amount.module.css";
import { NetworkType } from "../../const/chains";
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
} from "@thirdweb-dev/react";
import { DestinationTx } from "./Destination";
import { BigNumber, ethers } from "ethers";
import { Burn } from "./Burn";
import { Balance } from "../Balance/Balance";
import { Dispatch, SetStateAction } from "react";
// need to create an input which we pass the value through to the modal
// view the USDC balance on the origin chain

type Props = {
  network: NetworkType;
  destinationNetwork: NetworkType;
  setEthereumAsNetwork: Dispatch<SetStateAction<boolean>>;
};

const Amount: React.FC<Props> = ({
  network,
  destinationNetwork,
  setEthereumAsNetwork,
}) => {
  const [messageBytes, setMessageBytes] = useState("");
  const [attestationSignature, setAttestationSignature] = useState("");
  const address = useAddress();
  const { contract } = useContract(network.usdcContract);
  const { data } = useContractRead(contract, "allowance", [
    address,
    network.tokenMessengerContract,
  ]);

  const [amount, setAmount] = useState<BigNumber>(ethers.BigNumber.from(0));
  if (data) {
    console.log(ethers.BigNumber.from(data._hex).toNumber(), "data");
    console.log(amount.toNumber(), "amount");
  }
  return (
    <div className={styles.container}>
      <Balance
        network={network}
        amount={amount}
        setAmount={setAmount}
      ></Balance>
      <div className={styles.buttonContainer}>
        {address ? (
          amount > ethers.BigNumber.from(0) ? (
            data ? (
              ethers.BigNumber.from(data._hex).toNumber() >=
              amount.toNumber() ? (
                <div>
                  {attestationSignature === "" || messageBytes === "" ? (
                    <div>
                      <Burn
                        network={network}
                        destinationNetwork={destinationNetwork}
                        destinationAddress={address}
                        amount={amount}
                        setMessageBytes={setMessageBytes}
                        setAttestationSignature={setAttestationSignature}
                      ></Burn>
                    </div>
                  ) : (
                    <div>
                      <DestinationTx
                        destinationNetwork={destinationNetwork}
                        messageBytes={messageBytes}
                        attestationSignature={attestationSignature}
                        setEthereumAsNetwork={setEthereumAsNetwork}
                      ></DestinationTx>
                    </div>
                  )}
                </div>
              ) : (
                <Approve
                  address={address}
                  network={network}
                  amount={amount}
                ></Approve>
              )
            ) : (
              <p>loading...</p>
            )
          ) : (
            <p>Enter a USDC Amount to Swap</p>
          )
        ) : (
          <ConnectWallet />
        )}
      </div>
    </div>
  );
};

export default Amount;
