import * as firebase from "firebase";
import "firebase/firestore";
import NotificationOut, { notificationOutConverter } from "../models/NotificationOut";

export async function createContributorInvitation(notification: NotificationOut, email: string, userId: string) {
   const emailUse = await firebase.auth().fetchSignInMethodsForEmail(email)
   if(emailUse.length > 0 && notification.fromMail !== email) {
      const db = firebase.firestore();
      const test = await db.collection("users")
         .doc(userId)
         .collection('outNotifications')
         .withConverter(notificationOutConverter)
         .add(notification)
   } else {
      console.log('notification error')
   }
   return true;
}