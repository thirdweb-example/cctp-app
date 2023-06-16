import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Nav } from "../components/Nav/Nav";
import Modal from "../components/Modal/Modal";
import Toggle from "../components/Toggle/Toggle";
import { NetworkType } from "./_app";
import { Dispatch, SetStateAction } from "react";

type Props = {
  network: NetworkType;
  destinationNetwork: NetworkType;
  setEthereumAsNetwork: Dispatch<SetStateAction<boolean>>;
  isTestnet: boolean;
  setTestnetAsNetwork: Dispatch<SetStateAction<boolean>>;
};

const Home: NextPage<Props> = ({
  network,
  destinationNetwork,
  setEthereumAsNetwork,
  isTestnet,
  setTestnetAsNetwork,
}) => {
  //useState to keep track of the current balance
  //useState to keep track of the current amount
  //logic for the swap
  return (
    <div className={styles.container}>
      <Nav></Nav>
      <main className={styles.main}>
        <Modal
          network={network}
          destinationNetwork={destinationNetwork}
          setEthereumAsNetwork={setEthereumAsNetwork}
        />
        <Toggle
          isTestnet={isTestnet}
          setTestnetAsNetwork={setTestnetAsNetwork}
        />
      </main>
    </div>
  );
};

export default Home;
