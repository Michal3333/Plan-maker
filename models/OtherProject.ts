import * as firebase from "firebase";
import "firebase/firestore";
import Contributor from "./Contributor";
import { projecTask } from "./MyProject";

export default class OtherProject {
   id: string;
   name: string;
   color: string;
   dueDate: Date;
   tasks: projecTask[] | null;
   weeklyLimit : number;
   weeklyDone : number;
   totalHours : number;
   ownerMail : string;
   sharedStatusId: string;
   allowNotification: boolean;
   allowDetails: boolean;


   setId = (newId : string) => {
      this.id = newId
   }



   constructor(id: string, name: string, color: string, dueDate: Date, tasks: projecTask[], weeklyLimit : number, weeklyDone : number, totalHours : number, ownerMail: string, sharedStatusId: string, allowNotification: boolean, allowDetails: boolean){
      this.id = id;
      this.name = name;
      this.color = color;
      this.dueDate = dueDate;
      this.tasks = tasks;
      this.weeklyLimit = weeklyLimit;
      this.weeklyDone = weeklyDone;
      this.totalHours = totalHours;
      this.ownerMail = ownerMail;
      this.sharedStatusId = sharedStatusId;
      this.allowNotification = allowNotification;
      this.allowDetails = allowDetails;
   }

}

export const otherProjectConverter = {
   toFirestore: (project : OtherProject) => ({ 
      name: project.name,
      color: project.color,
      dueDate: firebase.firestore.Timestamp.fromDate(project.dueDate),
      tasks: project.tasks,
      weeklyLimit: project.weeklyLimit,
      weeklyDone: project.weeklyDone,
      totalHours: project.totalHours,
      ownerMail : project.ownerMail,
      sharedStatusId: project.sharedStatusId
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new OtherProject(snapshot.id, data.name, data.color, data.dueDate.toDate(), data.tasks.map((x : any) => ({...x, dueDate: x.dueDate.toDate()})), data.weeklyLimit, data.weeklyDone, data.totalHours, data.ownerMail, data.sharedStatusId, data.allowNotification, data.allowDetails);
  }
}

