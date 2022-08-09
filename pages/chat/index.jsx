/* eslint-disable react-hooks/rules-of-hooks */
// imports
import React from "react";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Styles from "../../styles/chat.module.css";
import * as firebase from "../../constants/firebase";
import JoinSpaceShipModal from "../../components/modals/joinSpaceShip";
import LoadingAnimation from "../../components/LoadingAnimation";
import ChatNav from "../../components/ChatNav";

// fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faGear } from "@fortawesome/free-solid-svg-icons";

const index = () => {
  // initializing auth
  const auth = firebase.firebaseAuth.getAuth(firebase.app);

  // loading state
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  let currentUserPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (auth.currentUser) {
        resolve(auth.currentUser);
      } else {
        setTimeout(() => {
          if (auth.currentUser) return resolve(auth.currentUser);
          setTimeout(() => {
            if (auth.currentUser) return resolve(auth.currentUser);
            reject("not logged in.");
          }, 1000);
        }, 1000);
      }
    }, 1000);
  });

  currentUserPromise
    .then(() => {
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      router.push({
        pathname: "/login",
        query: { ref: "chat" },
      });
    });

  return (
    <div id="container">
      <Head>
        <title>Entity Messenger</title>
      </Head>
      {loading ? (
        <LoadingAnimation show={loading} />
      ) : (
        <>
          <div className={Styles.container}>
            <ChatNav />
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
            <div className={Styles.main}></div>
            <div className={Styles.right}>
              <button
                className={Styles.createSpaceShipButton}
                id="addFriendsButton"
              >
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className={Styles.createSpaceShip}
                />
              </button>
            </div>
            <div className={Styles.bottom}>
              <div className={Styles.nav}>
                <h2 className={Styles.name}>
                  {auth.currentUser.displayName} &#160;&#160;&#160;
                  <button id="settingsButton" className={Styles.settingsButton}>
                    <FontAwesomeIcon icon={faGear} className="white" />
                  </button>
                </h2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default index;
