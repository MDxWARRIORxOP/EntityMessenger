import Head from "next/head";
import styles from "../../styles/downloads.module.css";
import Link from "next/link";

import Logo from "../../components/logo";

const index = () => {
  return (
    <div className={styles.container}>
      <>
        <Head>
          <title>Downloads</title>
        </Head>
        <div className={styles.left}>
          <Logo />
        </div>

        <div className={styles.right}>
          <>
            <h1>Downloads</h1>
            <h2>
              You dont have to download{" "}
              <span className="underline">ANYTHING</span>
            </h2>
            <h2>You can just use it in your browser!</h2>
            <Link href="/chat">
              <>
                <button className="openDiscordButton">
                  <span>Open Entity Messenger</span>
                </button>
              </>
            </Link>
          </>
        </div>
      </>
    </div>
  );
};

export default index;
