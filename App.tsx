import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as firebase from 'firebase';
import apiKeys from './config/keys';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigator';
import StoreProvider, { RootState } from './store/store'



export default function App() {
   if (!firebase.apps.length) {
      console.log('Connected with Firebase')
      firebase.initializeApp(apiKeys.firebaseConfig);
    }

   return (
      <StoreProvider>
         <Navigation/>
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
