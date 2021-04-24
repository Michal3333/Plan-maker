import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import MyProject, { projectConverter } from "../models/myProject";
import { FB_COLLECTIONS } from "./collections";

export async function createProject(userId : string, project : MyProject) {
   const db = firebase.firestore();
   const test = await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS)
      .withConverter(projectConverter)
      .add(project)
   return test.id;
}

export const getMyProjects = async (userId : string) => {
   const db = firebase.firestore();
   const data = await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS)
      .withConverter(projectConverter)
      .get()
   const projects : MyProject[] = []
   data.forEach(x => projects.push(x.data()))
   return projects
}

export const deleteProject = async (userId: string, projectId: string) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS)
      .doc(projectId)
      .delete()
   return projectId
}