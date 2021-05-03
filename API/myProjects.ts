import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import Contributor from "../models/Contributor";
import MyProject, { projectConverter } from "../models/MyProject";
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

export async function updateProject(userId : string, project : MyProject) {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(project.shared ? FB_COLLECTIONS.MY_PROJECTS_SHARED : FB_COLLECTIONS.MY_PROJECTS)
      .doc(project.id)
      .withConverter(projectConverter)
      .set(project)
   return project
}

export const getMyProjects = async (userId : string) => {
   const db = firebase.firestore();
   const data = await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS)
      .withConverter(projectConverter)
      .get()
   const dataShared = await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS_SHARED)
      .withConverter(projectConverter)
      .get()
   const projects : MyProject[] = []
   dataShared.forEach(x => {
      const project = x.data();
      project.setShared()
      projects.push(project)
   })
   data.forEach(x => projects.push(x.data()))
   return projects
}

export const deleteProject = async (userId: string, project: MyProject) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(project.shared ? FB_COLLECTIONS.MY_PROJECTS_SHARED : FB_COLLECTIONS.MY_PROJECTS)
      .doc(project.id)
      .delete()
   return project.id
}
export const convertToSharedProject = async (userId: string, project: MyProject) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS)
      .doc(project.id)
      .delete()
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS_SHARED)
      .doc(project.id)
      .withConverter(projectConverter)
      .set(project)
   return project
}

export const convertToMyProject = async (userId: string, project: MyProject) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS_SHARED)
      .doc(project.id)
      .delete()
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS)
      .doc(project.id)
      .withConverter(projectConverter)
      .set(project)
   return project
}

export const updateContributors = async (userId: string, contributor: Contributor, projectId: string, myMail: string) => {
   const emailUse = await firebase.auth().fetchSignInMethodsForEmail(contributor.contributorMail)
   if(emailUse.length > 0 && contributor.contributorMail !== myMail) {
      const db = firebase.firestore();
      const result = await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS_SHARED)
      .doc(projectId)
      .update({
         contributors: firebase.firestore.FieldValue.arrayUnion(contributor.getAsObject())
      })
   } else {
      throw new Error('No emial')
   }
}
// export const testRules = async () => {
//    try {
//       const db = firebase.firestore();
//       const result = await db.collection(FB_COLLECTIONS.USERS)
//       .doc('mmSwWB4TqFem0upRnL2hEmdyMgj2')
//       .collection(FB_COLLECTIONS.MY_PROJECTS)
//       .add({
//          result: "super rulesy bulwo"
//       })
//    } catch (error) {
//       Alert.alert("There is something wrong!!!!", error.message);
//    }
     
// }
