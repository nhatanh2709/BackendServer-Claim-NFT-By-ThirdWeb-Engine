import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  const onClick = async () => {
    const res = await fetch("/api/claimNFT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userAddress : address}),
    })
    if(res.ok) {
      alert("NFT claimmed!")
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectWallet/>
        {
          address && (
            <button
                onClick={onClick}
            >Claim NFT</button>
          )
        }
      </div>
    </main>
  );
};

export default Home;
