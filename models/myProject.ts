import * as firebase from "firebase";
import "firebase/firestore";

export default class MyProject {
   id: string;
   name: string;
   color: string;
   dueDate: Date;
   tasks: projecTask[]

   setId = (newId : string) => {
      this.id = newId
   }


   constructor(id: string, name: string, color: string, dueDate: Date, tasks: projecTask[]){
      this.id = id;
      this.name = name;
      this.color = color;
      this.dueDate = dueDate;
      this.tasks = tasks
   }

}

export const projectConverter = {
   toFirestore: (project : MyProject) => ({ 
      name: project.name,
      color: project.color,
      dueDate: firebase.firestore.Timestamp.fromDate(project.dueDate),
      tasks: project.tasks
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new MyProject(snapshot.id, data.name, data.color, data.dueDate.toDate(), data.tasks.map((x : any) => ({...x, dueDate: x.dueDate.toDate()})));
  }
}

type projecTask = {
   id: string,
   text: string,
   done: boolean,
   dueDate: Date
}