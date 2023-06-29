import { useAddress, useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { Networks, NetworkSlug, NetworkType } from "../../const/chains";
import { ethers, utils } from "ethers";
import styles from "./Approve.module.css";
import { Dispatch, SetStateAction } from "react";
import { Status } from "../../const/types";

interface AttestationResponse {
  status: string;
  attestation?: string;
}

interface BurnProps {
  network: NetworkType;
  destinationNetwork: NetworkSlug;
  amount: string;
  setMessageBytes: Dispatch<SetStateAction<string>>;
  setAttestationSignature: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<Status>>;
};

export const Burn: React.FC<BurnProps> = ({
  network,
  destinationNetwork,
  amount,
  setMessageBytes,
  setAttestationSignature,
  setStatus,
}) => {
  // initialize contract
  const { contract: tokenMessengerContract } = useContract(
    network.tokenMessengerContract
  );

  // destination address
  const address = useAddress();
  const destinationAddressInBytes32 = ethers.utils.defaultAbiCoder.encode(
    ["address"],
    [address]
  );

  // STEP 2: Burn USDC
  const { mutateAsync: burnUsdc } = useContractWrite(
    tokenMessengerContract,
    "depositForBurn"
  );

  const fullDestinationNetwork = Networks[destinationNetwork];

  const burn = async () => {
    console.log({ amount, formatted: utils.parseUnits(amount, 6) });
    const burnTx = await burnUsdc({
      args: [
        utils.parseUnits(amount, 6),
        fullDestinationNetwork.domain,
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

      console.log(burnTx, "burnUsdc data");
      console.log(burnTx.receipt.logs, "burnUsdc logs");

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
        action={async () => {
          return await burn();
        }}
        onSuccess={() => {
          setStatus("swap");
        }}
      >
        Deposit USDC
      </Web3Button>
    </div>
  );
};
