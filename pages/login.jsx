/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "../styles/login.module.css";
import * as firebase from "../util/firebase.js";
import Navbar from "../components/Navbar";
import {
  googleLogin,
  githubLogin,
  emailLogin,
  createUser,
} from "../util/fireAuth.js";

const login = function () {
  const router = useRouter();

  function redirect() {
    router.query.ref == "chat" ? router.push("/chat") : router.push("/");
  }

  function handleEmailLogin(e) {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    const error = emailLogin(email, password).then(function () {
      redirect();
    });

    error ? showError() : "";
  }

  function handleLoginGithub(e) {
    e.preventDefault();

    const error = githubLogin().then(function () {
      redirect();
    });

    error ? showError() : "";
  }

  function handleLoginGoogle(e) {
    e.preventDefault();

    const error = googleLogin().then(function () {
      redirect();
    });

    error ? showError() : "";
  }

  function showError(e) {
    const errLabel = useRef(null);
    errLabel.current.style.color = "red";
    errLabel.current.textContent =
      "Some error has occurred. " + e
        ? "Try checking your credentials"
        : "Please try again later";
  }

  function showSuccess(message) {
    const errLabel = useRef(null);
    errLabel.current.style.color = "green";
    errLabel.current.textContent = message;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <div className={styles.left}>
        <h1>Login with email and password</h1>

        <form action="#" onSubmit={handleEmailLogin}>
          <label htmlFor="email">Email: </label>
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
          <label htmlFor="password">Password: </label>
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
          <p id="errLabel"></p>
        </form>
      </div>
      <div className={styles.right}>
        <div className={styles.loginButtons}>
          <h1>Login using an auth provider</h1>
          <button onClick={handleLoginGoogle} className={styles.authButton}>
            Login with Google
          </button>
          <br />
          <button className={styles.authButton} onClick={handleLoginGithub}>
            Login with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default login;
