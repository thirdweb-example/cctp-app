import type { NextPage } from "next";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useMemo, useState } from "react";
import { NetworkSlug, Networks } from "../const/chains";
import { Card } from "../components/card";
import { Nav } from "../components/nav";
import { Status } from "../const/types";

const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as string;
if (!clientId) {
  console.log("Missing env var: NEXT_PUBLIC_TEMPLATE_CLIENT_ID");
  throw new Error("Missing env var: NEXT_PUBLIC_TEMPLATE_CLIENT_ID");
}

const Home: NextPage = () => {
  const [status, setStatus] = useState<Status>("idle");

  const [sourceNetwork, setSourceNetwork] = useState<NetworkSlug>("avalanche-fuji");
  const [destinationNetwork, setDestinationNetwork] =
    useState<NetworkSlug>("sepolia");

  const slugNetwork = useMemo(() => {
    return status === "mint" ? destinationNetwork : sourceNetwork;
  }, [status, destinationNetwork, sourceNetwork]);

  const activeChain = Networks[slugNetwork];

  return (
    <ThirdwebProvider activeChain={activeChain.network} clientId={clientId}>
      <div className="px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col max-w-3xl gap-12 mx-auto">
          <Nav />
          <Card
            sourceNetwork={sourceNetwork}
            setSourceNetwork={setSourceNetwork}
            destinationNetwork={destinationNetwork}
            setDestinationNetwork={setDestinationNetwork}
            status={status}
            setStatus={setStatus}
          />
        </div>
      </div>
    </ThirdwebProvider>
  );
};

export default Home;
