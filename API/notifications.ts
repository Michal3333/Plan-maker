import * as firebase from "firebase";
import "firebase/firestore";
import { notificationInConverter } from "../models/NotificationIn";
import NotificationOut, { notificationOutConverter } from "../models/NotificationOut";
import { FB_COLLECTIONS } from "./collections";

export async function createContributorInvitation(notification: NotificationOut, email: string, userId: string) {
   const emailUse = await firebase.auth().fetchSignInMethodsForEmail(email)
   if(emailUse.length > 0 && notification.fromMail !== email) {
      const db = firebase.firestore();
      await db.collection(FB_COLLECTIONS.USERS)
         .doc(userId)
         .collection(FB_COLLECTIONS.OUT_NOTIFICATIONS)
         .withConverter(notificationOutConverter)
         .add(notification)
   } else {
      console.log('notification error')
   }
   return true;
}

export async function keepGettingNotifications(userId: string, dispatchFunction : () => void) {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.IN_NOTIFICATIONS)
      .withConverter(notificationInConverter)
      .onSnapshot(snapShots => {
         snapShots.forEach(x => {
            if(x.exists){
               const data = x.data();
               console.log(data)
            }
         })
      })

   return true;
}