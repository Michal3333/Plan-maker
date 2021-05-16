import * as firebase from "firebase";
import "firebase/firestore";
import OtherProject, { otherProjectConverter } from "../models/OtherProject";
import { FB_COLLECTIONS } from "./collections";

export async function keepGettingOtherProjects(userId: string, addOtherProject: (project: OtherProject) => void, updateOtherProject: (project: OtherProject) => void) {
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
               addOtherProject(data)
            } else if( x.type === "modified") {
               const data = x.doc.data()
               updateOtherProject(data)
            }
         })
      })
   return unsubsrcibe;
}
export const deleteOtherProject = async (userId: string, otherProjectId: string ) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.OTHER_PROJECTS)
      .doc(otherProjectId)
      .delete;
}