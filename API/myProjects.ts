import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import myProject, { projectConverter } from "../models/myProject";

export async function createProject(userId : string, project : myProject) {
   try {
      const db = firebase.firestore();
      await db.collection("users")
         .doc(userId)
         .collection('myProjects')
         .withConverter(projectConverter)
         .add(project)
      return true;
   } catch (err) {
      console.log(err)
      Alert.alert("There is something wrong!!!!", err.message);
      return false;
   }
}

export async function getMyProjects(userId : string) {
   try {
      const db = firebase.firestore();
      const data = await db.collection("users")
         .doc(userId)
         .collection('myProjects')
         .withConverter(projectConverter)
         .get()
      data.forEach(x => {
         console.log(x.data())
      })
      return true;
   } catch (err) {
      console.log(err)
      Alert.alert("There is something wrong!!!!", err.message);
      return false;
   }
}