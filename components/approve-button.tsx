import { Web3Button } from "@thirdweb-dev/react";
import { utils } from "ethers";

interface ApproveButtonProps {
  contractAddress: string;
  tokenMessengerContract: string;
  amount: string;
};

export const ApproveButton: React.FC<ApproveButtonProps> = ({ contractAddress, tokenMessengerContract, amount }) => {
  const isDisabled = !amount || Number(amount) <= 0;

  return (
    <Web3Button
      className="connect-wallet"
      contractAddress={contractAddress}
      action={(contract) =>
        contract.call("approve", [
          tokenMessengerContract,
          utils.parseUnits(amount, 6),
        ])
      }
      isDisabled={isDisabled}
    >
      Approve the Swap
    </Web3Button>
  );
};
