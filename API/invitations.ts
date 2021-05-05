import * as firebase from "firebase";
import "firebase/firestore";
import Invitation, { invitationConverter } from "../models/Invitation";
import NotificationOut, { notificationOutConverter } from "../models/NotificationOut";
import { FB_COLLECTIONS } from "./collections";

export async function keepGettingInvitations(userId: string, addInvitaion : (invitation: Invitation) => void) {
   const db = firebase.firestore();
   const unsubsrcibe =  db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.INVITATIONS)
      .withConverter(invitationConverter)
      .onSnapshot(snapShots => {
         snapShots.docChanges().forEach(x => {
            if (x.type === "added") {
               const data = x.doc.data()
               addInvitaion(data)
            }
         })
      })

   return unsubsrcibe;
}