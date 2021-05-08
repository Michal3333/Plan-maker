import * as firebase from "firebase";
import "firebase/firestore";
import NotificationUser, { notificationConverter } from "../models/NotificationUser";
import { FB_COLLECTIONS } from "./collections";

export async function keepGettingNotifications(userId: string, addNotification : (notifications: NotificationUser) => void) {
   const db = firebase.firestore();
   const unsubsrcibe = db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.NOTIFICATIONS)
      .withConverter(notificationConverter)
      .onSnapshot(snapShots => {
         snapShots.docChanges().forEach(x => {
            if (x.type === "added") {
               const data = x.doc.data()
               addNotification(data)
            }
         })
      })
   return unsubsrcibe;
}

export async function deleteNotification(userId: string, notificationId : string){
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.NOTIFICATIONS)
      .doc(notificationId)
      .delete()
}