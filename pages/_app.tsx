import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { useState } from "react";
import {
  GoerliTestnet,
  FujiTestnet,
  Mainnet,
  AvalancheMainnet,
} from "../const/chains";

function MyApp({ Component, pageProps }: AppProps) {
  //useState to keep track of the current network
  const [isEthereum, setEthereumAsNetwork] = useState(true);
  const [isTestnet, setTestnetAsNetwork] = useState(false);

  const network = isTestnet
    ? isEthereum
      ? GoerliTestnet
      : FujiTestnet
    : isEthereum
    ? Mainnet
    : AvalancheMainnet;

  const destinationNetwork = isTestnet
    ? isEthereum
      ? FujiTestnet
      : GoerliTestnet
    : isEthereum
    ? AvalancheMainnet
    : Mainnet;
  return (
    <ThirdwebProvider activeChain={network.network}>
      <Component
        {...pageProps}
        network={network}
        destinationNetwork={destinationNetwork}
        isTestnet={isTestnet}
        setEthereumAsNetwork={setEthereumAsNetwork}
        setTestnetAsNetwork={setTestnetAsNetwork}
      />
    </ThirdwebProvider>
  );
}

export default MyApp;
