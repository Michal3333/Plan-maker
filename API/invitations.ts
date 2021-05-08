import * as firebase from "firebase";
import "firebase/firestore";
import Invitation, { invitationConverter } from "../models/Invitation";
import { FB_COLLECTIONS, INITATION_STATUS } from "./collections";

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
               if(data.status === INITATION_STATUS.PENDING){
                  addInvitaion(data)
               }
            }
         })
      })
   return unsubsrcibe;
}

export async function sendInvitationAnswer(userId: string, invitationId: string, answer: INITATION_STATUS){
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.INVITATIONS)
      .doc(invitationId)
      .withConverter(invitationConverter)
      .update({
         status: answer
      })
}