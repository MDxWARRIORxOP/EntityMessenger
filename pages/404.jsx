import Link from "next/link";
import Head from "next/head";
import Styles from "../styles/404.module.css";

const page = () => {
  return (
    <div className={Styles.container}>
      <>
        <Head>
          <title>404 page not found</title>
        </Head>
        <div className={Styles.text}>
          <>
            <h1>OOPS... Page not found</h1>
            <h2>Please try checking the URL.</h2>
            <p>
              Return &#160;
              <span className="underline">
                <Link href="/">Home</Link>
              </span>
            </p>
          </>
        </div>
      </>
    </div>
  );
};

export default page;
