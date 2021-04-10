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
      return {registrationResult : true, mail: currentUser.email as string}
   } catch (err) {
      console.log(err)
      Alert.alert("There is something wrong!!!!", err.message);
      return {registrationResult : false, mail: ''}
   }
}

export async function signIn(email: string, password: string) {
   try {
      await firebase
         .auth()
         .signInWithEmailAndPassword(email, password);
      return true
   } catch (err) {
      Alert.alert("There is something wrong!", err.message);
   }
}

export async function loggingOut() {
   try {
      await firebase.auth().signOut();
   } catch (err) {
      Alert.alert('There is something wrong!', err.message);
   }
}