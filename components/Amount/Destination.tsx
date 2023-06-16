import { NetworkType } from "../../pages";
import { Web3Button, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { destinationTx } from "../../utils/destinationChain";
import { Signer } from "ethers";
import styles from "./Amount.module.css";

type Props = {
  messageBytes: any;
  destinationNetwork: NetworkType;
  attestationSignature: any;
  signer: Signer | undefined;
};

export const DestinationTx: React.FC<Props> = ({
  messageBytes,
  destinationNetwork,
  attestationSignature,
  signer,
}) => {
  return (
    <ThirdwebSDKProvider
      signer={signer}
      activeChain={destinationNetwork.network}
    >
      <Destination
        messageBytes={messageBytes}
        destinationNetwork={destinationNetwork}
        attestationSignature={attestationSignature}
        signer={signer}
      />
    </ThirdwebSDKProvider>
  );
};

export const Destination: React.FC<Props> = ({
  messageBytes,
  destinationNetwork,
  attestationSignature,
  signer,
}) => {
  return (
    <Web3Button
      className={styles.button}
      contractAddress={destinationNetwork.messageTransmitterContract}
      action={() => {
        destinationTx(
          messageBytes,
          attestationSignature,
          signer,
          destinationNetwork
        );
      }}
    >
      Swap USDC
    </Web3Button>
  );
};
