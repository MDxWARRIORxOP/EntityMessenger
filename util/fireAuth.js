import { Auth } from "./firebase";
import * as FireAuth from "firebase/auth";

const GProvider = new FireAuth.GoogleAuthProvider();
const GiProvider = new FireAuth.GithubAuthProvider();

/**
 * @remarks
 * Creates the user, and logs them in. access the user's properties by `auth.currentUser`
 * @param {String} email
 * @param {String} password
 * @param {String} displayName
 */
async function createUser(email, password, displayName) {
  try {
    await FireAuth.createUserWithEmailAndPassword(Auth, email, password);
    await FireAuth.updateProfile(Auth.currentUser, {
      displayName,
    });
  } catch (error) {
    return error;
  }
}

/**
 * @remarks
 * Logins in a user. access the user's properties by `auth.currentUser`
 * @param {String} email
 * @param {String} password
 */
async function emailLogin(email, password) {
  try {
    await signInWithEmailAndPassword(Auth, email, password);
  } catch (error) {
    return error;
  }
}

/**
 * @remarks
 * Creates/logs in a user. access the user's properties by `auth.currentUser`
 */
async function googleLogin() {
  try {
    await FireAuth.signInWithPopup(Auth, GProvider);
  } catch (error) {
    return error;
  }
}

/**
 *@remarks
 *Creates/logins a user. access the user's property by  auth.currentUser`
 */
async function githubLogin() {
  try {
    await FireAuth.signInWithPopup(Auth, GiProvider);
  } catch (error) {
    return error;
  }
}

export { createUser, emailLogin, googleLogin, githubLogin };
