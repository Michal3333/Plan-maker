import * as firebase from "firebase";
import "firebase/firestore";
import MyProjectShared from "./MyProjectShared";

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

   setId = (newId : string) => {
      this.id = newId
   }

   updateProjectData = (name: string, color: string, dueDate: Date, weeklyLimit : number) => {
      this.name = name;
      this.color = color;
      this.dueDate = dueDate;
      this.weeklyLimit = weeklyLimit;
   }

   addTask = (text: string, dueDate: Date) => {
      this.tasks.push({
         id: new Date().getTime().toString(),
         text: text,
         done: false,
         dueDate: dueDate
      })
   }

   convertToSharedProject = (project : MyProject) =>  {
      const {id, name, color, dueDate, tasks, weeklyLimit, weeklyDone, totalHours} = project;
      const sharedProject = new MyProjectShared(id, name, color, dueDate, tasks, weeklyLimit, weeklyDone, totalHours)
      return sharedProject;
   }


   constructor(id: string, name: string, color: string, dueDate: Date, tasks: projecTask[], weeklyLimit : number, weeklyDone : number, totalHours : number){
      this.id = id;
      this.name = name;
      this.color = color;
      this.dueDate = dueDate;
      this.tasks = tasks;
      this.weeklyLimit = weeklyLimit;
      this.weeklyDone = weeklyDone;
      this.totalHours = totalHours;
      this.shared = false;
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
      totalHours: project.totalHours
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new MyProject(snapshot.id, data.name, data.color, data.dueDate.toDate(), data.tasks.map((x : any) => ({...x, dueDate: x.dueDate.toDate()})), data.weeklyLimit, data.weeklyDone, data.totalHours);
  }
}

export type projecTask = {
   id: string,
   text: string,
   done: boolean,
   dueDate: Date
}