// imports
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Styles from "../../styles/chat.module.css";
import * as firebase from "../../constants/firebase";
import JoinSpaceShipModal from "../../components/modals/joinSpaceShip";
import LoadingAnimation from "../../components/LoadingAnimation";

// fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const index = () => {
  // initializing auth
  const auth = firebase.firebaseAuth.getAuth(firebase.app);

  // declaring the user variable
  let user;

  // loading state
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // set loading to false after 14 seconds
  setTimeout(() => {
    setLoading(false);

    // get the current user
    user = auth.currentUser;
  }, 14000);

  let addSpaceship = () => {
    setShow(true);
  };

  return (
    <div id="container">
      <Head>
        <title>Entity Messenger</title>
      </Head>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className={Styles.container}>
            <div className={Styles.left}>
              <button
                className={Styles.createSpaceShipButton}
                id="createServerButton"
              >
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className={Styles.createSpaceShip}
                />
              </button>
            </div>
            <div className={Styles.main}>
              <JoinSpaceShipModal show="true" />
            </div>
            <div className={Styles.bottom}>bottom</div>
            <div className={Styles.right}>right</div>
          </div>
        </>
      )}
      <Link href="/login" id="ChangeLink">
        <></>
      </Link>
    </div>
  );
};

export default index;
