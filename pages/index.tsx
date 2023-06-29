import type { NextPage } from "next";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useMemo, useState } from "react";
import {
  NetworkSlug,
  Networks,
} from "../const/chains";
import { Container } from "../components/Container/Container";
import { Nav } from "../components/Nav/Nav";
import styles from "../styles/Home.module.css";
import { Status } from "../const/types";

const Home: NextPage = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [isTestnet, setIsTestnet] = useState(true);

  const [sourceNetwork, setSourceNetwork] = useState<NetworkSlug>("goerli");
  const [destinationNetwork, setDestinationNetwork] = useState<NetworkSlug>("avalanche-fuji");

  const slugNetwork = useMemo(() => {

    return status === "swap" ? destinationNetwork : sourceNetwork;
  }, [status, destinationNetwork, sourceNetwork]);

  const activeChain = Networks[slugNetwork];

  return (
    <ThirdwebProvider activeChain={activeChain.network}>
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
            status={status}
            setStatus={setStatus}
          />
        </main>
      </div>
    </ThirdwebProvider>
  );
};


export default Home;
