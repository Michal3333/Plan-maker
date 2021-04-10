import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(email: string, password: string) {
   try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser as firebase.User;

      const db = firebase.firestore();
      await db.collection("users")
         .doc(currentUser.uid)
         .set({
            email: currentUser.email
         });
      return {registrationResult : true, uid: currentUser.uid}
   } catch (err) {
      console.log(err)
      Alert.alert("There is something wrong!!!!", err.message);
      return {registrationResult : false, uid: ''}
   }
}

export async function signIn(email: string, password: string) {
   try {
      await firebase
         .auth()
         .signInWithEmailAndPassword(email, password);
      const db = firebase.firestore();
      const id = firebase.auth().currentUser?.uid
      if(id){
         return {registrationResult : true, uid: id}
      }
      throw new Error("adasda");
      
      
   } catch (err) {
      Alert.alert("There is something wrong!", err.message);
      return {registrationResult : false, uid: ''}
   }
}

export async function loggingOut() {
   try {
      await firebase.auth().signOut();
   } catch (err) {
      Alert.alert('There is something wrong!', err.message);
   }
}