/* eslint-disable react-hooks/rules-of-hooks */
// imports
import React from "react";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Styles from "../../styles/chat.module.css";
import { Auth } from "../../util/firebase";
import Image from "next/image";
import LoadingAnimation from "../../components/LoadingAnimation";
import ChatNav from "../../components/ChatNav";
import img from "../../public/toBeUsed.png";

// fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faGear } from "@fortawesome/free-solid-svg-icons";

const index = () => {
  // loading state
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const currentUserPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Auth.currentUser) {
        resolve(Auth.currentUser);
      } else {
        setTimeout(() => {
          if (Auth.currentUser) return resolve(Auth.currentUser);
          setTimeout(() => {
            if (Auth.currentUser) return resolve(Auth.currentUser);
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

  // TODO:
  const showSpaceShip = () => {
    console.log("lmao not showing a spaceship.");
  };

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
              {/* example spaceShip */}
              <div className={Styles.spaceShip}>
                <button
                  className={Styles.spaceShipButton}
                  onClick={showSpaceShip}
                >
                  <Image
                    className="spaceShipLogo"
                    src={img.src}
                    alt="SpaceShipLogo"
                  />
                </button>
              </div>
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
                  {Auth.currentUser.displayName} &#160;&#160;&#160;
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
