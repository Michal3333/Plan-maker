import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import MyProject, { projectConverter } from "../models/myProject";

export async function createProject(userId : string, project : MyProject) {
   const db = firebase.firestore();
   const test = await db.collection("users")
      .doc(userId)
      .collection('myProjects')
      .withConverter(projectConverter)
      .add(project)
   return test.id;
}

export const getMyProjects = async (userId : string) => {
   const db = firebase.firestore();
   const data = await db.collection("users")
      .doc(userId)
      .collection('myProjects')
      .withConverter(projectConverter)
      .get()
   const projects : MyProject[] = []
   data.forEach(x => projects.push(x.data()))
   return projects
}