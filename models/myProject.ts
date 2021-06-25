import * as firebase from "firebase";
import "firebase/firestore";
import Contributor from "./Contributor";

export default class MyProject {
   id: string;
   name: string;
   color: string;
   dueDate: Date;
   tasks: projecTask[];
   weeklyLimit : number;
   weeklyDone : number;
   totalHours : number;
   shared: boolean;
   contributors: Contributor[];
   icon: string;


   setId = (newId : string) => {
      this.id = newId
   }



   constructor(id: string, name: string, color: string, dueDate: Date, tasks: projecTask[], weeklyLimit : number, weeklyDone : number, totalHours : number, shared: boolean, icon: string){
      this.id = id;
      this.name = name;
      this.color = color;
      this.icon = icon;
      this.dueDate = dueDate;
      this.tasks = tasks;
      this.weeklyLimit = weeklyLimit;
      this.weeklyDone = weeklyDone;
      this.totalHours = totalHours;
      this.shared = shared;
      this.contributors = [];
   }

}

export const projectConverter = {
   toFirestore: (project : MyProject) => ({ 
      name: project.name,
      color: project.color,
      dueDate: firebase.firestore.Timestamp.fromDate(project.dueDate),
      tasks: project.tasks,
      weeklyLimit: project.weeklyLimit,
      weeklyDone: project.weeklyDone,
      totalHours: project.totalHours,
      icon: project.icon

   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new MyProject(snapshot.id, data.name, data.color, data.dueDate.toDate(), data.tasks.map((x : any) => ({...x, dueDate: x.dueDate.toDate()})), data.weeklyLimit, data.weeklyDone, data.totalHours, false, data.icon);
  }
}

export const sharedProjectConverter = {
   toFirestore: (project : MyProject) => ({ 
      name: project.name,
      color: project.color,
      dueDate: firebase.firestore.Timestamp.fromDate(project.dueDate),
      tasks: project.tasks,
      weeklyLimit: project.weeklyLimit,
      weeklyDone: project.weeklyDone,
      totalHours: project.totalHours,
      icon: project.icon
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new MyProject(snapshot.id, data.name, data.color, data.dueDate.toDate(), data.tasks.map((x : any) => ({...x, dueDate: x.dueDate.toDate()})), data.weeklyLimit, data.weeklyDone, data.totalHours, true, data.icon);
  }
}

export type projecTask = {
   id: string,
   text: string,
   done: boolean,
   dueDate: Date
}