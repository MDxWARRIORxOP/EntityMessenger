import Link from "next/link";
import Head from "next/head";
import styles from "../styles/login.module.css";
import * as firebase from "../constants/firebase.js";

const auth = firebase.firebaseAuth.getAuth(firebase.app);

const googleProvider = new firebase.firebaseAuth.GoogleAuthProvider();
const githubProvider = new firebase.firebaseAuth.GithubAuthProvider();
const twitterProvider = new firebase.firebaseAuth.TwitterAuthProvider();

let showError = (error) => {
  const AuthErrorCodes = {
    WRONG_PASSWORD: "FirebaseError: Firebase: Error (auth/wrong-password).",
    EMAIL_ALREADY_IN_USE:
      "FirebaseError: Firebase: Error (auth/email-already-in-use).",
    INTERNAL_ERROR: "FirebaseError: Firebase: Error (auth/internal-error).",
    USER_NOT_FOUND: "FirebaseError: Firebase: Error (auth/user-not-found).",
    MISSING_EMAIL: "FirebaseError: Firebase: Error (auth/missing-email).",
    WEAK_PASSWORD:
      "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).",
    INVALID_EMAIL: "FirebaseError: Firebase: Error (auth/invalid-email).",
    ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIALS:
      "FirebaseError: Firebase: Error (auth/account-exists-with-different-credential).",
    POPUP_CLOSED_BY_USER:
      "FirebaseError: Firebase: Error (auth/popup-closed-by-user).",
    POPUP_BLOCKED: "FirebaseError: Firebase: Error (auth/popup-blocked).",
  };

  errLabel.style.color = "red";

  if (error == AuthErrorCodes.WRONG_PASSWORD) {
    errLabel.textContent = "Invalid password, please try again.";
    return;
  } else if (error == AuthErrorCodes.EMAIL_ALREADY_IN_USE) {
    errLabel.textContent =
      "Email already in use, please try a different email.";
    return;
  } else if (error == AuthErrorCodes.INTERNAL_ERROR) {
    errLabel.textContent = "Internal error, please try again later.";
    return;
  } else if (error == AuthErrorCodes.USER_NOT_FOUND) {
    errLabel.textContent =
      "User not found, please try again with different credentials.";
    return;
  } else if (
    error == AuthErrorCodes.MISSING_EMAIL ||
    error == AuthErrorCodes.INVALID_EMAIL
  ) {
    errLabel.textContent = "Please enter a valid email.";
    return;
  } else if (error == AuthErrorCodes.WEAK_PASSWORD) {
    errLabel.textContent = "Password should atleast have 6 characters.";
    return;
  } else if (
    error == AuthErrorCodes.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIALS
  ) {
    errLabel.textContent = "Account already exists with different credentials.";
    return;
  } else if (error == AuthErrorCodes.POPUP_CLOSED_BY_USER) {
    errLabel.textContent = "Popup closed, please try again.";
    return;
  } else if (error == AuthErrorCodes.POPUP_BLOCKED) {
    errLabel.textContent =
      "Popup blocked, please enable popups in your browser.";
    return;
  }

  errLabel.textContent = error;
};

let showSuccess = (message) => {
  const errLabel = document.getElementById("errLabel");
  errLabel.style.color = "green";

  errLabel.textContent = message;

  setTimeout(() => {
    const a = document.getElementById("changeLink");
    a.click();
  }, 2000);
};

// const showCreateAccountModal = () => {
//   return (
//     <div className={styles.modal}>
//       <h1>Account does not exist.</h1>
//       <h2>Create one?</h2>
//       <button>Yes</button>&#160;&#160;&#160;<button>Cancel</button>
//     </div>
//   );
// };

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
  } catch (error) {
    console.error("error:", error);
    showError(e);
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
  } catch (e) {
    console.log(e);
    showError(e);
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
  } catch (e) {
    console.log(e);
    showError(e);
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
  } catch (e) {
    console.log(e);
    showError(e);
  }
};

const login = () => {
  return (
    <div className={styles.container}>
      <>
        <Head>
          <title>Login</title>
        </Head>

        <div className={styles.left}>
          <>
            <h1>Login with email and password</h1>

            <form
              action="#"
              onSubmit={(e) => {
                loginWithEmailAndPassword(e);
              }}
            >
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
                Don&apos;t have an account?&#160;
                <span className="underline">
                  <Link href="/signup">Signup instead.</Link>
                </span>
              </p>
              <p>
                Forgot password?{" "}
                <span className="underline">
                  <Link href="/resetPassword">Reset Password.</Link>
                </span>
              </p>
              <p id="errLabel"></p>
            </form>

            <Link href="/chat" id="changeLink"></Link>
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
      </>
    </div>
  );
};

export default login;
