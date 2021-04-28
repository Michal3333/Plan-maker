import * as firebase from "firebase";
import "firebase/firestore";
import { CONTRIBUTOR_STATUS } from "../API/collections";
import MyProject, { projecTask } from "./MyProject";

export default class MyProjectShared extends MyProject {
   contributors :contributor[]
   constructor(id: string, name: string, color: string, dueDate: Date, tasks: projecTask[], weeklyLimit : number, weeklyDone : number, totalHours : number){
      super(id, name, color, dueDate, tasks, weeklyLimit, weeklyDone, totalHours)
      this.contributors = [];
      this.shared = true;
   }

   setContributors = (contributors : contributor[]) => {
      this.contributors = contributors
   }
   convertToMyProject = (project : MyProjectShared) =>  {
      const {id, name, color, dueDate, tasks, weeklyLimit, weeklyDone, totalHours} = project;
      const myProject = new MyProject(id, name, color, dueDate, tasks, weeklyLimit, weeklyDone, totalHours)
      return myProject;
   }
}

type contributor = {
   id: string,
   contributorMail : string,
   status: CONTRIBUTOR_STATUS,
   allowMessage: boolean,
   allowDetails: boolean,
}

export const sharedProjectConverter = {
   toFirestore: (project : MyProject) => ({ 
      name: project.name,
      color: project.color,
      dueDate: firebase.firestore.Timestamp.fromDate(project.dueDate),
      tasks: project.tasks,
      weeklyLimit: project.weeklyLimit,
      weeklyDone: project.weeklyDone,
      totalHours: project.totalHours
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new MyProjectShared(snapshot.id, data.name, data.color, data.dueDate.toDate(), data.tasks.map((x : any) => ({...x, dueDate: x.dueDate.toDate()})), data.weeklyLimit, data.weeklyDone, data.totalHours);
  }
}

export const contributorConverter = {
   toFirestore: (contributor : contributor) => ({ 
      id: contributor.id,
      contributorMail : contributor.contributorMail,
      status: contributor.status,
      allowMessage: contributor.allowMessage,
      allowDetails: contributor.allowDetails,
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): contributor => {
      const data = snapshot.data(options) ;
      return {
         id: snapshot.id,
         contributorMail: data.contributorMail,
         status: data.status,
         allowMessage: data.allowMessage,
         allowDetails: data.allowDetails
      }
  }
}