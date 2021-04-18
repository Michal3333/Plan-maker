import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';

export async function registration(email: string, password: string) {
   await firebase.auth().createUserWithEmailAndPassword(email, password);
   const currentUser = firebase.auth().currentUser as firebase.User;

   const db = firebase.firestore();
   await db.collection("users")
      .doc(currentUser.uid)
      .set({
         email: currentUser.email
      });
   await SecureStore.setItemAsync('id', currentUser.uid);
   await SecureStore.setItemAsync('email', email);
   return currentUser.uid
}

export async function signIn(email: string, password: string) {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
   const id = firebase.auth().currentUser?.uid
   if(id){
      await SecureStore.setItemAsync('id', id);
      await SecureStore.setItemAsync('email', email);
      return id;
   } else {
      throw Error('error');
   }
}

export async function loggingOut() {
   await firebase.auth().signOut();
   await SecureStore.deleteItemAsync('id')
}