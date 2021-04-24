import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';

export async function registration(email: string, password: string) {
   await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
   await firebase.auth().createUserWithEmailAndPassword(email, password);
   const currentUser = firebase.auth().currentUser as firebase.User;

   const db = firebase.firestore();
   await db.collection("users")
      .doc(currentUser.uid)
      .set({
         email: currentUser.email
      });
   return currentUser.uid
}

export async function signIn(email: string, password: string) {
   await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
   const id = firebase.auth().currentUser?.uid
   if(id){
      return id;
   } else {
      throw Error('error');
   }
}
export async function checkIfUserSignIn() {
   const user = await firebase.auth().currentUser;
   return user;
}


export async function loggingOut() {
   await firebase.auth().signOut();
}