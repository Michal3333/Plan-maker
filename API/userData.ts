import * as firebase from "firebase";
import "firebase/firestore";
import { FB_COLLECTIONS } from "./collections";

export type timeLog = {
   date : Date,
   time: number,
   projectId: string
}

export async function addTimeLog(userId: string, time: number, projectId: string) {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .update({
         timeLog: firebase.firestore.FieldValue.arrayUnion({
            date: new Date().getTime(),
            time: time,
            projectId: projectId
         })
      });
}

export async function fetchTimeLog(userId: string): Promise<timeLog[]> {
   const db = firebase.firestore();
   const doc = await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .get();
   
   const data = doc.data()
   
   if(data && data.timeLog){
      return data.timeLog.map((x : any) => {
         return {
            date : new Date(x.date),
            time: x.time,
            projectId: x.projectId
         }
      })
   } else {
      return []
   }
}


