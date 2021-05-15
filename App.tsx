import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as firebase from 'firebase';
import apiKeys from './config/keys';
import { StyleSheet, Text, View } from 'react-native';
import StoreProvider, { RootState } from './store/store'
import MainApp from './navigation/MainApp';



export default function App() {
   if (!firebase.apps.length) {
      try {
         firebase.initializeApp(apiKeys.firebaseConfig);
         console.log('Connected with Firebase')
      } catch (error) {
         console.log(error);
      }
    }

   return (
      <StoreProvider>
         <MainApp/>
         <StatusBar/>
      </StoreProvider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
