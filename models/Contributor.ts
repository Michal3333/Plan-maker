import * as firebase from "firebase";
import "firebase/firestore";
import { CONTRIBUTOR_STATUS } from "../API/collections";
import MyProject, { projecTask } from "./MyProject";

export default class Contributor {
   id: string;
   contributorMail : string;
   status: CONTRIBUTOR_STATUS;
   allowMessage: boolean;
   allowDetails: boolean;

   constructor(id: string, contributorMail: string, status: CONTRIBUTOR_STATUS, allowMessage: boolean, allowDetails: boolean){
      this.id = new Date().getTime().toString()
      this.contributorMail = contributorMail;
      this.status = status;
      this.allowMessage = allowMessage;
      this.allowDetails = allowDetails;
   }
   // setId = (id: string) => {
   //    this.id = id;
   // }
   getAsObject = () => {
      return {
         id: this.id,
         contributorMail : this.contributorMail,
         status: this.status,
         allowMessage: this.allowMessage,
         allowDetails: this.allowDetails,
      }
   } 
}



export const contributorConverter = {
   toFirestore: (contributor : Contributor) => ({ 
      contributorMail : contributor.contributorMail,
      status: contributor.status,
      allowMessage: contributor.allowMessage,
      allowDetails: contributor.allowDetails,
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Contributor => {
      const data = snapshot.data(options) ;
      return new Contributor (snapshot.id, data.contributorMail, data.status, data.allowMessage, data.allowDetails)
  }
}