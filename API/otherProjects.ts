import * as firebase from "firebase";
import "firebase/firestore";
import OtherProject, { otherProjectConverter } from "../models/OtherProject";
import { FB_COLLECTIONS } from "./collections";

export async function keepGettingOtherProjects(userId: string) {
   const db = firebase.firestore();
   const unsubsrcibe = db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.OTHER_PROJECTS)
      .withConverter(otherProjectConverter)
      .onSnapshot(snapShots => {
         snapShots.docChanges().forEach(x => {
            console.log(x)
            if (x.type === "added") {
               const data = x.doc.data()
               // addNotification(data)
            }
         })
      })
   return unsubsrcibe;
}