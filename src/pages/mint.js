import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { contractAddress, ABI } from "@/constants/constants";
import { useSigner, useAccount, useNetwork } from "wagmi";
import { ethers, Contract } from "ethers";

function Mint({ PRIVATE_KEY, URL }) {
  const { data: userSigner } = useSigner();
  const { connector: activeConnector, isConnected } = useAccount();
  const { chain, chains } = useNetwork();

  const [loading, setLoading] = useState(false);
  const [notWhiteListed, setNotWhiteListed] = useState(false);
  const [tokenTransferred, setTokenTransferred] = useState(false);

  useEffect(() => {
    setLoading(false);
    setNotWhiteListed(false);
    setTokenTransferred(false);
  }, [userSigner, chain]);

  const getTokens = async () => {
    try {
      if (isConnected && chain.id == 80001) {
        setTokenTransferred(false);
        setNotWhiteListed(false);
        setLoading(true);
        let provider = new ethers.providers.JsonRpcProvider(URL);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        const signer = wallet.connect(provider);

        const tokenContract = new Contract(contractAddress, ABI, signer);
        const isWhiteListed = await tokenContract.checkWhiteList(
          userSigner._address
        );
        if (isWhiteListed) {
          const tx = await tokenContract.mint(userSigner._address);
          const response = await tx.wait();
          response.status && setTokenTransferred(true);
        } else {
          setNotWhiteListed(true);
        }
        setLoading(false);
        console.log(isWhiteListed);
      } else {
        alert("Connect your wallet to Polygon Mumbai");
      }
    } catch (error) {
      console.log(`An error occurred: ${error.message}`);
    }
  };
  return (
    <div className="">
      <div className="absolute top-4 left-5">
        <ConnectButton />
      </div>
      <div className="flex flex-col absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 justify-center items-center">
        <p className="mb-5 text-center">
          You can get tokens if your submission is approved. Make sure you
          connect the account which you submitted in the form.
        </p>
        <button
          className="bg-gradient-to-r from-purple-400 to-blue-700 hover:scale-105 transition-all text-white uppercase py-1.5 px-4 rounded-lg shadow-md"
          onClick={getTokens}
        >
          Get tokens
        </button>
      </div>
      {loading ? (
        <div
          className="flex flex-col absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 justify-center items-center mt-1"
          role="status"
        >
          <svg
            aria-hidden="true"
            className="inline w-9 h-9 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        ""
      )}

      {notWhiteListed ? (
        <div className="flex flex-col absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 justify-center items-center mt-1 font-bold">
          {"Your address has no tokens allowted:("}
        </div>
      ) : (
        ""
      )}
      {tokenTransferred ? (
        <div className="flex flex-col absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 justify-center items-center mt-1 font-bold">
          {"Tokens transferred successfully:)"}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Mint;

export async function getServerSideProps() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const URL = process.env.URL;

  return {
    props: {
      PRIVATE_KEY,
      URL,
    },
  };
}
{
}
