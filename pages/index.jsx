import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Logo from "../components/logo.jsx";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Entity Messenger</title>
        <link
          rel="shortcut icon"
          href="../public/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <Navbar />
      <div className={styles.mainInHome}>
        <Logo />
        <div className={styles.text}>
          <h1>Entity Messenger</h1>
          <h2>
            Do you seriously still use Skype or Zoom? <br /> They worked well in
            2018, but in 2022, <br /> it&apos;s time to upgrade to Entity
            Messenger!
          </h2>
          <br />
          <Link href="/chat">
            <button className="openDiscordButton">
              <span>Open Entity Messenger</span>
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.benefits}>
        <h1 className="black">Now here are some features:</h1>
        <ul>
          <li>
            <h2>Create your own spaceship with as many rooms as you want.</h2>
          </li>
          <li>
            <h2>Chat with your friends from all over the world.</h2>
          </li>
          <li>
            <h2>Voice/video chats that are clear and fast.</h2>
          </li>
          <li>
            <h2>With no limitations on core features.</h2>
          </li>
        </ul>
      </div>
    </div>
  );
}
