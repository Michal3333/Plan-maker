import * as firebase from "firebase";
import "firebase/firestore";
import { Project, projecTask } from "./MyProject";

export default class OtherProject implements Project {
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
   complited: number;


   setId = (newId : string) => {
      this.id = newId
   }



   constructor(id: string, name: string, color: string, dueDate: Date, tasks: projecTask[], weeklyLimit : number, weeklyDone : number, totalHours : number, ownerMail: string, sharedStatusId: string, allowNotification: boolean, allowDetails: boolean, complited: number){
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
      this.complited = complited;
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
      sharedStatusId: project.sharedStatusId,
      complited: project.complited
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new OtherProject(snapshot.id, 
                  data.name, 
                  data.color, 
                  data.dueDate.toDate(), 
                  data.tasks.map((x : any) => ({...x, dueDate: x.dueDate.toDate()})), 
                  data.weeklyLimit, data.weeklyDone, data.totalHours, data.ownerMail, 
                  data.sharedStatusId, 
                  data.allowMessage, 
                  data.allowDetails,
                  data.complited ? data.complited : 0);
  }
}

