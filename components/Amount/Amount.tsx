import styles from "./Amount.module.css";
import { NetworkType } from "../../const/chains";
import { useState } from "react";
import { Approve } from "./Approve";
import {
  Web3Button,
  useAddress,
  useSigner,
  useSwitchChain,
  useContract,
  useContractRead,
  useChainId,
} from "@thirdweb-dev/react";
import { DestinationTx } from "./Destination";
import { ethers } from "ethers";
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
  const signer = useSigner();
  const address = useAddress();
  const switchChain = useSwitchChain();
  const chainId = useChainId();
  const { contract } = useContract(network.usdcContract);
  const { data, isLoading, error } = useContractRead(contract, "allowance", [
    address,
    address,
  ]);
  const [amount, setAmount] = useState<number>(0);

  return (
    <div className={styles.container}>
      <Balance
        network={network}
        amount={amount}
        setAmount={setAmount}
      ></Balance>
      <div className={styles.buttonContainer}>
        {data && address ? (
          ethers.BigNumber.from(data._hex).toNumber() >= amount &&
          amount > 0 ? (
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
                  {chainId === network.network.chainId ? (
                    <Web3Button
                      className={styles.button}
                      contractAddress={network.usdcContract}
                      action={() => {
                        switchChain(destinationNetwork.network.chainId);
                      }}
                    >
                      Switch Chain
                    </Web3Button>
                  ) : (
                    <DestinationTx
                      signer={signer}
                      destinationNetwork={destinationNetwork}
                      messageBytes={messageBytes}
                      attestationSignature={attestationSignature}
                      setEthereumAsNetwork={setEthereumAsNetwork}
                    ></DestinationTx>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Approve address={address} network={network}></Approve>
          )
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default Amount;
