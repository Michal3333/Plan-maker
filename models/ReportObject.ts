export default class RaportObject {
   name: string;
   goal: number;
   done : number;
   color: string;
   constructor(name: string, goal: number, done: number, color: string){
      this.name = name;
      this.goal = goal;
      this.done = done;
      this.color = color;
   }
}

export const raportObjectConverter = {
   toFirestore: (object : RaportObject) => ({ 
      name: object.name,
      goal: object.goal,
      done : object.done,
      color: object.color,
   }),
   fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
      const data = snapshot.data(options);
      return new RaportObject(
         data.name, 
         data.goal, 
         data.done, 
         data.color
      );
  }
}