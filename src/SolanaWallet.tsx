import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { FiCopy, FiTrash } from 'react-icons/fi'; // Icons for copy and delete

interface SolanaWalletProps {
  mnemonic: string;
}

export const SolanaWallet: React.FC<SolanaWalletProps> = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey);
    
    setPublicKeys([...publicKeys, keypair.publicKey]);
    setCurrentIndex(currentIndex + 1);
  };

  const copyToClipboard = async (publicKey: string) => {
    await navigator.clipboard.writeText(publicKey);
    alert(`Copied to clipboard: ${publicKey}`);
  };

  const deleteWallet = (publicKey: PublicKey) => {
    setPublicKeys(publicKeys.filter((p) => p !== publicKey));
  };

  return (
    <div className="text-center">
      <button
        onClick={addWallet}
        className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg shadow-md hover:bg-green-400 transition"
      >
        Add SOL Wallet
      </button>

      <div className="mt-6 space-y-4">
        {publicKeys.map((publicKey, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-700 p-4 rounded-md"
          >
            <p className="text-lg font-mono text-green-300 truncate w-2/3">
              Solana Public Key: {publicKey.toBase58()}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(publicKey.toBase58())}
                className="text-green-400 hover:text-green-500 transition"
                title="Copy Public Key"
              >
                <FiCopy size={20} />
              </button>
              <button
                onClick={() => deleteWallet(publicKey)}
                className="text-red-400 hover:text-red-500 transition"
                title="Delete Wallet"
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
