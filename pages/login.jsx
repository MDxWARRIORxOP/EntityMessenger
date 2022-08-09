/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import * as firebase from "../constants/firebase.js";
import Navbar from "../components/Navbar";

const login = () => {
  const router = useRouter();

  const auth = firebase.firebaseAuth.getAuth(firebase.app);
  // const db = firebase.firebaseFirestore.getFirestore(firebase.app);

  const googleProvider = new firebase.firebaseAuth.GoogleAuthProvider();
  const githubProvider = new firebase.firebaseAuth.GithubAuthProvider();
  const twitterProvider = new firebase.firebaseAuth.TwitterAuthProvider();

  // let addUserData = (user) => {
  //   const usersRef = firebase.firebaseFirestore.doc(db, "users", user.uid);
  //   const userData = {
  //     name: user.displayName,
  //     emailVerified: user.emailVerified,
  //     metadata: {
  //       createdAt: user.metadata.creationTime,
  //     },
  //     phoneNumber: user.phoneNumber,
  //     profilePicture: user.photoURL,
  //     uid: user.uid,
  //     servers: {},
  //   };
  //   firebase.firebaseFirestore.setDoc(usersRef, userData, { merge: true });
  //   console.log("user added");
  // };

  let showError = () => {
    errLabel.style.color = "red";
    errLabel.textContent = "Some error has occurred. Please try again later";
  };

  let showErrorE = () => {
    errLabel.style.color = "red";
    errLabel.textContent =
      "Some error has occurred. Try checking your credentials";
  };

  let showSuccess = (message) => {
    const errLabel = document.getElementById("errLabel");
    errLabel.style.color = "green";

    errLabel.textContent = message;

    // firebase.firebaseAuth.onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     addUserData(user);
    //   }
    // });
  };

  const loginWithEmailAndPassword = async (e) => {
    e.preventDefault();

    let credentials;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    try {
      credentials = await firebase.firebaseAuth.signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials);
      showSuccess("Logged in!");
      if (router.query.ref) {
        router.push("/chat");
      }
      return credentials;
    } catch (error) {
      if (error == "FirebaseError: Firebase: Error (auth/user-not-found).") {
        try {
          let credentials =
            await firebase.firebaseAuth.createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
          let username = prompt(
            "Please enter your username to create a new account: "
          );

          firebase.firebaseAuth.updateProfile(auth.currentUser, {
            displayName: username,
          });

          console.log(credentials);
          showSuccess("Logged in!");
          if (router.query.ref) {
            router.push("/chat");
          }
          return credentials;
        } catch (e) {
          console.log(e);
          showErrorE();
          return null;
        }
      }

      console.error(error);
      showErrorE();
      return null;
    }
  };

  const loginWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const result = await firebase.firebaseAuth.signInWithPopup(
        auth,
        googleProvider
      );

      const user = result.user;
      const credentials =
        firebase.firebaseAuth.GoogleAuthProvider.credentialFromResult(result);

      console.log(result, user, credentials);
      showSuccess("successfully logged in!");
      if (router.query.ref) {
        router.push("/chat");
      }
    } catch (e) {
      console.log(e);
      showError();
    }
  };

  const loginWithGithub = async (e) => {
    e.preventDefault();

    try {
      const result = await firebase.firebaseAuth.signInWithPopup(
        auth,
        githubProvider
      );

      const user = result.user;
      const credentials =
        firebase.firebaseAuth.GithubAuthProvider.credentialFromResult(result);

      console.log(result, user, credentials);
      showSuccess("successfully logged in!");
      if (router.query.ref) {
        router.push("/chat");
      }
    } catch (e) {
      console.log(e);
      showError();
    }
  };

  const loginWithTwitter = async (e) => {
    e.preventDefault();

    try {
      const result = await firebase.firebaseAuth.signInWithPopup(
        auth,
        twitterProvider
      );

      const user = result.user;
      const credentials =
        firebase.firebaseAuth.TwitterAuthProvider.credentialFromResult(result);

      console.log(result, user, credentials);
      showSuccess("successfully logged in!");
      if (router.query.ref) {
        router.push("/chat");
      }
    } catch (e) {
      console.log(e);
      showError();
    }
  };

  return (
    <div className={styles.container}>
      <>
        <Head>
          <title>Login</title>
        </Head>
        <Navbar />
        <div className={styles.left}>
          <>
            <h1>Login with email and password</h1>

            <form
              action="#"
              onSubmit={(e) => {
                loginWithEmailAndPassword(e);
              }}
            >
              <>
                <label htmlFor="email">Email: </label> &#160;{" "}
                <input
                  type="email"
                  name="password"
                  className={styles.emailInput}
                  placeholder="Email"
                  autoComplete="username"
                  id="emailInput"
                  required
                />
                <br />
                <label htmlFor="password">Password: </label> &#160;{" "}
                <input
                  type="password"
                  name="password"
                  className={styles.passwordInput}
                  placeholder="Password"
                  autoComplete="current-password"
                  id="passwordInput"
                  required
                  minLength="6"
                  maxLength="12"
                />
                <br />
                <button type="submit" className={styles.loginButton}>
                  Login
                </button>
                <p>
                  <>
                    Forgot password?{" "}
                    <span className="underline">
                      <Link href="/resetPassword">Reset Password.</Link>
                    </span>
                  </>
                </p>
                <p id="errLabel"></p>
              </>
            </form>
          </>
        </div>
        <div className={styles.right}>
          <>
            <div className={styles.loginButtons}>
              <>
                <h1>Login using an auth provider</h1>
                <button
                  onClick={(e) => {
                    loginWithGoogle(e);
                  }}
                  className={styles.authButton}
                >
                  Login with Google
                </button>
                <br />
                <button
                  className={styles.authButton}
                  onClick={(e) => {
                    loginWithGithub(e);
                  }}
                >
                  Login with Github
                </button>
                <br />
                <button
                  className={styles.authButton}
                  onClick={(e) => {
                    loginWithTwitter(e);
                  }}
                >
                  Login with Twitter
                </button>
              </>
            </div>
          </>
        </div>
        <Link href="/chat" id="changeLink">
          <></>
        </Link>
      </>
    </div>
  );
};

export default login;
