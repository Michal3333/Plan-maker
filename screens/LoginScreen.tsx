import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native'
import { SignInScreenNavigationProp } from '../navigation/navigationTypes';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action'
import Screen from '../components/UI/Screen';
import MainButton from '../components/UI/MainButton';



type Props = {
   navigation: SignInScreenNavigationProp
}

export const assets = [require('../assets/dark_with_line.png')]

const LoginScreen = (props: Props) => {
   const dispatch = useDispatch()
   
   const [email, setEmail] = useState('test@gmail.com');
   const [password, setPassword] = useState('123456');

   return (
      <ImageBackground source={assets[0]} style={styles.imgBackground} resizeMode="cover" >
         <Screen style={styles.screen} withKeyboard={true}>
            <View style={styles.titleBox}>
               <Text style={styles.titleText}>Welcome</Text>
            </View>
            <View style={styles.contentBox}>
               <Text style={styles.text}>Email</Text>
               <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
               <Text style={styles.text}>Password</Text>
               <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} value={password} />
               <Button title="Sign in" onPress={() => {dispatch(userActions.asyncSignIn(email, password))}}
                  disabled={email === '' || password === ''} color="white"/>

               <Button title="Sign up" onPress={() => { props.navigation.navigate('SignIn') }} color="white"/>
               {/* <MainButton title="sign in" onPress={() => {dispatch(userActions.asyncSignIn(email, password))}}/>

               <MainButton title="sign up" onPress={() => { props.navigation.navigate('SignIn') }}/> */}
            </View>
           
         </Screen>
      </ImageBackground>
   )
}

const styles = StyleSheet.create({
   screen: {
      justifyContent: 'center',
   },
   input: {
      height: 40,
      borderBottomColor: 'black',
      borderBottomWidth: 3,
      width: '80%',
      marginBottom: 20,
      color: 'white',
      fontFamily: 'open-sans',
      fontSize: 16
   },
   imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1 
   },
   contentBox: {
      width: "100%",
      maxWidth: 400,
      backgroundColor: '#141418',
      borderRadius: 50,
      alignItems: "center",
      paddingVertical: 60,
      borderColor: "black",
      borderWidth: 7,
   },
   titleBox: {
      width: "100%",
      maxWidth: 400,
   },
   titleText: {
      color: 'black',
      fontFamily: 'russo-one',
      fontSize: 70,
      fontWeight: 'bold',
      // backgroundColor: '#264653'
      // textShadowColor: 'white',
      // textShadowOffset: {width: 0, height: 0},
      // textShadowRadius: 4
   },
   text: {
      textAlign: 'left',
      width: "80%",
      color: 'white',
      fontFamily: 'open-sans-bold',
      fontSize: 20,
   }
})
export default LoginScreen;