import * as firebase from "firebase";
import "firebase/firestore";
import { FB_COLLECTIONS } from "./collections";

export async function addTimeLog(userId: string, time: number) {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .update({
         timeLog: firebase.firestore.FieldValue.arrayUnion({
            date: new Date().getTime(),
            time: time
         })
      });
}
