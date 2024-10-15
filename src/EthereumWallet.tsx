import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet } from "ethers";
import { HDNode } from "@ethersproject/hdnode";
import { FiCopy, FiTrash } from "react-icons/fi"; // Icons for copy and delete

interface EthWalletProps {
  mnemonic: string;
}

export const EthWallet: React.FC<EthWalletProps> = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNode.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const wallet = new Wallet(child.privateKey);

    setAddresses([...addresses, wallet.address]);
    setCurrentIndex(currentIndex + 1);
  };

  const copyToClipboard = async (address: string) => {
    await navigator.clipboard.writeText(address);
    alert(`Copied to clipboard: ${address}`);
  };

  const deleteAddress = (address: string) => {
    setAddresses(addresses.filter((addr) => addr !== address));
  };

  return (
    <div className="text-center">
      <button
        onClick={addWallet}
        className="px-6 py-3 bg-blue-500 text-black font-semibold rounded-lg shadow-md hover:bg-blue-400 transition"
      >
        Add ETH Wallet
      </button>

      <div className="mt-6 space-y-4">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-700 p-4 rounded-md"
          >
            <p className="text-lg font-mono text-blue-300 truncate w-2/3">
              Ethereum Address: {address}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(address)}
                className="text-blue-400 hover:text-blue-500 transition"
                title="Copy Address"
              >
                <FiCopy size={20} />
              </button>
              <button
                onClick={() => deleteAddress(address)}
                className="text-red-400 hover:text-red-500 transition"
                title="Delete Address"
              >
                <FiTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
