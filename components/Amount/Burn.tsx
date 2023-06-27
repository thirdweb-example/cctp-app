import { useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { NetworkType } from "../../const/chains";
import { ethers } from "ethers";
import styles from "./Amount.module.css";
import { Dispatch, SetStateAction } from "react";

interface AttestationResponse {
  status: string;
  attestation?: string;
}

type Props = {
  network: NetworkType;
  destinationNetwork: NetworkType;
  destinationAddress: string | undefined;
  amount: number;
  setMessageBytes: Dispatch<SetStateAction<string>>;
  setAttestationSignature: Dispatch<SetStateAction<string>>;
};

export const Burn: React.FC<Props> = ({
  network,
  destinationAddress,
  amount,
  destinationNetwork,
  setMessageBytes,
  setAttestationSignature,
}) => {
  // initialize contract
  const { contract: tokenMessengerContract } = useContract(
    network.tokenMessengerContract
  );

  // destination address
  const destinationAddressInBytes32 = ethers.utils.defaultAbiCoder.encode(
    ["address"],
    [destinationAddress]
  );

  // STEP 2: Burn USDC
  const { mutateAsync: burnUSDC } = useContractWrite(
    tokenMessengerContract,
    "depositForBurn"
  );
  const burn = async () => {
    const burnTx = await burnUSDC({
      args: [
        amount,
        destinationNetwork.domain,
        destinationAddressInBytes32,
        network.usdcContract,
      ],
    });
    // STEP 3: Retrieve message bytes from logs
    const transactionReceipt = burnTx.receipt;
    const eventTopic = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("MessageSent(bytes)")
    );
    const log = transactionReceipt.logs.find(
      (l: any) => l.topics[0] === eventTopic
    );
    if (!log) {
      throw new Error("No MessageSent event found");
    } else {
      const messageBytes = ethers.utils.defaultAbiCoder.decode(
        ["bytes"],
        log.data
      )[0];
      const messageHash = ethers.utils.keccak256(messageBytes);

      console.log(`MessageBytes: ${messageBytes}`);
      console.log(`MessageHash: ${messageHash}`);

      console.log(burnTx, "burnUSDC data");
      console.log(burnTx.receipt.logs, "burnUSDC logs");

      // STEP 4: Fetch attestation signature
      let attestationResponse: AttestationResponse = { status: "pending" };
      while (attestationResponse.status !== "complete") {
        const response = await fetch(`${network.api}/${messageHash}`);
        attestationResponse = await response.json();
        await new Promise((r) => setTimeout(r, 2000));
      }
      const attestationSignature = attestationResponse.attestation;
      console.log(`Signature: ${attestationSignature}`);
      if (typeof attestationSignature === "undefined") return;
      setMessageBytes(messageBytes);
      setAttestationSignature(attestationSignature);
      console.log(attestationSignature, "attestationSignature");
      console.log(messageBytes, "messageBytes");
    }
  };
  return (
    <div>
      <Web3Button
        className={styles.button}
        contractAddress={network.usdcContract}
        action={burn}
      >
        Deposit USDC
      </Web3Button>
    </div>
  );
};
