import styles from "./Container.module.css";
import { Logic } from "../Logic/Logic";
import { NetworkDropdown } from "../NetworkDropdown/NetworkDropdown";
import { SwapNetwork } from "../SwapNetwork/SwapNetwork";
import { NetworkSlug, NetworkType } from "../../const/chains";
import { Dispatch, SetStateAction } from "react";
import { TestnetMainnetSelector } from "../testnet-mainnet-selector";
import { Status } from "../../const/types";

interface ContainerProps {
  sourceNetwork: NetworkSlug;
  setSourceNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  destinationNetwork: NetworkSlug;
  setDestinationNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  isTestnet: boolean;
  setIsTestnet: Dispatch<SetStateAction<boolean>>;
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
};

export const Container: React.FC<ContainerProps> = ({
  sourceNetwork,
  setSourceNetwork,
  destinationNetwork,
  setDestinationNetwork,
  isTestnet,
  setIsTestnet,
  status,
  setStatus,
}) => {
  console.log({ status })
  return (
    <div className={styles.container}>
      {/*       {status === "idle" ? ( */}
      <>
        <TestnetMainnetSelector
          isTestnet={isTestnet}
          setIsTestnet={setIsTestnet}
        />
        <NetworkDropdown network={sourceNetwork} setNetwork={setSourceNetwork} forbiddenNetwork={destinationNetwork} isTestnet={isTestnet} />
        <SwapNetwork sourceNetwork={sourceNetwork} setSourceNetwork={setSourceNetwork} destinationNetwork={destinationNetwork} setDestinationNetwork={setDestinationNetwork} />
        <NetworkDropdown network={destinationNetwork} setNetwork={setDestinationNetwork} forbiddenNetwork={sourceNetwork} isTestnet={isTestnet} />
      </>
      {/*       ) : ( */}
      <Logic
        sourceNetwork={sourceNetwork}
        destinationNetwork={destinationNetwork}
        status={status}
        setStatus={setStatus}
      />
      {/*       )} */}
    </div>
  );
};


