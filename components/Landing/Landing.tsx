import { Dispatch, SetStateAction } from "react";
import { NetworkSlug } from "../../const/chains";
import { Nav } from "../Nav/Nav";
import styles from "./Landing.module.css";
import { Container } from "../Container/Container";
import { Toggle } from "../Toggle/Toggle";
import { Status } from "../Main";

interface LandingProps {
  sourceNetwork: NetworkSlug;
  setSourceNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  destinationNetwork: NetworkSlug;
  setDestinationNetwork: Dispatch<SetStateAction<NetworkSlug>>;
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  isTestnet: boolean;
  setIsTestnet: Dispatch<SetStateAction<boolean>>;
};

export const Landing: React.FC<LandingProps> = ({
  sourceNetwork,
  setSourceNetwork,
  destinationNetwork,
  setDestinationNetwork,
  status,
  setStatus,
  isTestnet,
  setIsTestnet,
}) => {
  return (
    <div className={styles.container}>
      <Nav />
      <main className={styles.main}>
        <Container
          sourceNetwork={sourceNetwork}
          setSourceNetwork={setSourceNetwork}
          destinationNetwork={destinationNetwork}
          setDestinationNetwork={setDestinationNetwork}
          isTestnet={isTestnet}
          setIsTestnet={setIsTestnet}
        />
      </main>
    </div>
  );
};