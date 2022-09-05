import { Auth } from "./firebase";
import * as FireAuth from "firebase/auth";

const GProvider = new FireAuth.GoogleAuthProvider();
const GiProvider = new FireAuth.GithubAuthProvider()

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {String} displayName 
 * @returns Firebase user
 */
async function createUser(email, password, displayName) {
  return await FireAuth.createUserWithEmailAndPassword(Auth, email, password)
    .then(async function ({ user }) {
      // successfully created an account for the user
      const user = user;
      return await FireAuth.updateProfile(Auth.createUser, {
        displayName,
      })
        .then(function (User) {
          return User;
        })
        .catch(function (e) {
          return e;
        });
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("error:", errorCode, "\n", "message:", errorMessage);
      return false;
    });
}

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @returns Firebase user
 */
async function emailLogin(email, password) {
    return await signInWithEmailAndPassword(Auth, email, password)
    .then(function (userCredential) {
        const user = userCredential.user;
        return user;
    })
    .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorCode + ";" + errorMessage
    });
}

/**
 * 
 * @returns Firebase user
 */
async function googleLogin() {
  return await FireAuth.signInWithPopup(Auth, GProvider).then(function (result) {
    const credentials =
      await FireAuth.GoogleAuthProvider.credentialFromResult(result);
    await window.localStorage.setItem("credentials", JSON.stringify(credentials));

    return result.user;
  }).catch(e => {
    console.error(e)
    return e
  })
}

/**
 * 
 * @returns Firebase user
 */
 async function githubLogin() {
    return await FireAuth.signInWithPopup(Auth, GiProvider).then(function (result) {
      const credentials =
        await FireAuth.GithubAuthProvider.credentialFromResult(result);
      await window.localStorage.setItem("credentials", JSON.stringify(credentials));
  
      return result.user;
    }).catch(e => {
      console.error(e)
      return e
    })
}

export { createUser, emailLogin, googleLogin, githubLogin };
