import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers, utils } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { Status } from "../const/types";
import { NetworkType, NetworkSlug, Networks } from "../const/chains";

interface AttestationResponse {
  status: string;
  attestation?: string;
}

interface ApproveAndBurnButtonProps {
  network: NetworkType;
  destinationNetwork: NetworkSlug;
  amount: string;
  setMessageBytes: Dispatch<SetStateAction<string>>;
  setAttestationSignature: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<Status>>;
}

export const ApproveAndBurnButton: React.FC<ApproveAndBurnButtonProps> = ({
  network,
  destinationNetwork,
  amount,
  setMessageBytes,
  setAttestationSignature,
  setStatus,
}) => {
  const address = useAddress();

  // initialize contract
  const { contract: tokenMessengerContract } = useContract(
    network.tokenMessengerContract
  );

  console.log(tokenMessengerContract, "tokenMessengerContract");
  const { contract: usdcContract } = useContract(network.usdcContract);
  // Check allowance
  const { data: usdcAllowance } = useContractRead(usdcContract, "allowance", [
    address,
    network.tokenMessengerContract,
  ]);
  console.log(usdcAllowance, "usdcAllowance");
  const formattedAllowance = Number(
    utils.formatUnits(usdcAllowance || BigNumber.from(0), 6)
  );

  // destination address
  const destinationAddressInBytes32 = ethers.utils.defaultAbiCoder.encode(
    ["address"],
    [address]
  );

  // STEP 1: Approve USDC
  const { mutateAsync: approveUsdc } = useContractWrite(
    usdcContract,
    "approve"
  );

  // STEP 2: Burn USDC
  const { mutateAsync: burnUsdc } = useContractWrite(
    tokenMessengerContract,
    "depositForBurn"
  );

  const fullDestinationNetwork = Networks[destinationNetwork];

  const hasApprovedAmount =
    usdcAllowance && formattedAllowance >= Number(amount);
  console.log(hasApprovedAmount, "hasApprovedAmount");
  console.log(formattedAllowance, "usdcAllowance");
  console.log(utils.parseUnits(amount, 6).toNumber(), "amount");

  const approve = async () => {
    if (hasApprovedAmount || !usdcContract) {
      return;
    }
    await approveUsdc({
      args: [
        network.tokenMessengerContract,
        utils.parseUnits(amount, 6).toNumber(),
      ],
    });
  };

  const approveAndBurn = async () => {
    if (!usdcContract) {
      return;
    }
    // STEP 1: Approve USDC
    await approve();

    // STEP 2: Burn USDC
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
      setStatus("mint");
    }
  };

  const isDisabled = !usdcContract || !amount || Number(amount) <= 0;

  return (
    <div>
      <Web3Button
        className="connect-wallet"
        contractAddress={network.usdcContract}
        action={async () => {
          return await approveAndBurn();
        }}
        isDisabled={isDisabled}
      >
        Burn USDC
      </Web3Button>
    </div>
  );
};
