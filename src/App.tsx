import { useState } from 'react';
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthereumWallet';
import { motion } from 'framer-motion';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white font-sans">
      {/* Hero Section */}
      <header className="text-center py-32">
        <motion.h1 
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-300 to-blue-600 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Unlock the Power of Crypto with Solana and Ethereum
        </motion.h1>
      
        <p className="text-lg text-gray-400 mb-6">
          Create your Solana and Ethereum Wallets in seconds.
        </p>

        <motion.button 
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-black font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition"
          onClick={async function() {
            const mn = await generateMnemonic();
            setMnemonic(mn);
          }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          Create Seed Phrase
        </motion.button>

        {/* Display mnemonic */}
        {mnemonic && (
          <motion.div 
            className="mt-8 p-4 bg-gray-800 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Your Seed Phrase:</h3>
            
            {/* Seed phrase in a 3x4 grid */}
            <div className="grid grid-cols-3 gap-4 text-center text-green-300">
              {mnemonic.split(" ").map((word, index) => (
                <div key={index} className="p-2 bg-gray-700 rounded-md">
                  {index + 1}. {word}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      {/* Wallet Display Section */}
      {mnemonic && (
        <motion.div
          className="mt-5 space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Solana Wallet Section */}
          <div className="bg-gray-800 p-8 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-400 ">Solana Wallets</h2>
            <SolanaWallet mnemonic={mnemonic} />
          </div>

          {/* Ethereum Wallet Section */}
          <div className="bg-gray-800 p-8 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">Ethereum Wallets</h2>
            <EthWallet mnemonic={mnemonic} />
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="text-center mt-20 py-8 text-gray-500">
        <p>Made by Shabaz Shaik</p>
      </footer>
    </div>
  );
}

export default App;
