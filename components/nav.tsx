import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="flex justify-between">
      <Link href="/" className="flex justify-center items-center gap-3">
        <Image src="/thirdweb.svg" width={48} height={48} alt="thirdweb logo" />
        <span className="text-white font-bold">USDC Cross-Chain Transfer</span>
      </Link>

      <ConnectWallet theme="dark" />
    </nav>
  );
};
