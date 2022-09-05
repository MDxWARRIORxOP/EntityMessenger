import { DB } from "./firebase";
import * as Firestore from "@firebase/firestore";

/**
 * 
 * @param {String} collectionName 
 * @param {String} docName 
 * @param {object} data 
 * @param {Boolean} merge
 * @example await addData("cities", "LA", { capital: false })
 */
function addData(collectionName, docName, data, merge) {
    return await Firestore.setDoc(Firestore.doc(DB, collectionName, docName), data, { merge }).then(() => {
        return true
    }).catch(e => {
        return e
    })
}

/**
 * 
 * @param {String} collectionName 
 * @param {String} docName 
 * @returns Doc data (if exists) or false
 * @example const cityData = await getData("cities", "LA")
 */
function getData(collectionName, docName) {
    const docRef = Firestore.doc(DB, "cities", "SF");
    const docSnap = await Firestore.getDoc(docRef);

    if (docSnap.exists()) {
    return docSnap.data()
    } else {
    return false
    }
}

export {addData, getData}