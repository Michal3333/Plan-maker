import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import Contributor, { contributorConverter } from "../models/Contributor";
import MyProject, { projecTask, projectConverter, sharedProjectConverter } from "../models/MyProject";
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
      .withConverter(sharedProjectConverter)
      .get()
   const projects : MyProject[] = [];
   const sharedDocs = dataShared.docs;
   for(let i = 0; i < sharedDocs.length; i++){
      const sharedDoc = sharedDocs[i];
      const project = sharedDoc.data();
      project.contributors = [];
      project.shared = true;
      const contributors = await sharedDoc.ref.collection(FB_COLLECTIONS.CONTRIBUTORS)
      .withConverter(contributorConverter)
      .get();
      contributors.forEach(contributor => {
         const contributorData = contributor.data();
         project.contributors.push(contributorData);
      })
      projects.push(project)

   }
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
      .withConverter(sharedProjectConverter)
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

export const addContributor = async (userId: string, contributor: Contributor, projectId: string, myMail: string) => {
   const emailUse = await firebase.auth().fetchSignInMethodsForEmail(contributor.contributorMail)
   if(emailUse.length > 0 && contributor.contributorMail !== myMail) {
      const db = firebase.firestore();
      const result = await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS_SHARED)
      .doc(projectId)
      .collection(FB_COLLECTIONS.CONTRIBUTORS)
      .withConverter(contributorConverter)
      .add(contributor)
      return result.id;
   } else {
      throw new Error('No emial')
   }
}

export const updateContributor = async (userId: string, projectId: string, contributorId: string, allowMessage: boolean, allowDetails: boolean ) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
   .doc(userId)
   .collection(FB_COLLECTIONS.MY_PROJECTS_SHARED)
   .doc(projectId)
   .collection(FB_COLLECTIONS.CONTRIBUTORS)
   .doc(contributorId)
   .withConverter(contributorConverter)
   .update({
      allowMessage: allowMessage,
      allowDetails: allowDetails
   })
}

export const deleteContributor = async (userId: string, projectId: string ,contributorId: string) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(FB_COLLECTIONS.MY_PROJECTS_SHARED)
      .doc(projectId)
      .collection(FB_COLLECTIONS.CONTRIBUTORS)
      .doc(contributorId)
      .delete()
}


export const addTime = async (userId: string, projectId: string, shared: boolean, time: number) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(shared ? FB_COLLECTIONS.MY_PROJECTS_SHARED : FB_COLLECTIONS.MY_PROJECTS)
      .doc(projectId)
      .update({
         weeklyDone: firebase.firestore.FieldValue.increment(time),
         totalHours: firebase.firestore.FieldValue.increment(time),
      })
}

export const editProject = async (userId: string, projectId: string, shared: boolean, name: string, dueDate: Date, color: string, weeklyLimit: number) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(shared ? FB_COLLECTIONS.MY_PROJECTS_SHARED : FB_COLLECTIONS.MY_PROJECTS)
      .doc(projectId)
      .update({
         name,
         color,
         weeklyLimit,
         dueDate: firebase.firestore.Timestamp.fromDate(dueDate),
      })
}
export const addTask = async (userId: string, projectId: string, shared: boolean, task : projecTask) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(shared ? FB_COLLECTIONS.MY_PROJECTS_SHARED : FB_COLLECTIONS.MY_PROJECTS)
      .doc(projectId)
      .update({
         tasks : firebase.firestore.FieldValue.arrayUnion({
            ...task
         })
      })
}
export const deleteTask = async (userId: string, projectId: string, shared: boolean, task : projecTask) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(shared ? FB_COLLECTIONS.MY_PROJECTS_SHARED : FB_COLLECTIONS.MY_PROJECTS)
      .doc(projectId)
      .update({
         tasks : firebase.firestore.FieldValue.arrayRemove({
            ...task
         })
      })
}
export const updateTask = async (userId: string, projectId: string, shared: boolean, updatedTasks : projecTask[]) => {
   const db = firebase.firestore();
   await db.collection(FB_COLLECTIONS.USERS)
      .doc(userId)
      .collection(shared ? FB_COLLECTIONS.MY_PROJECTS_SHARED : FB_COLLECTIONS.MY_PROJECTS)
      .doc(projectId)
      .update({
         tasks : updatedTasks
      })
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
