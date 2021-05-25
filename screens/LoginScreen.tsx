import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, useColorScheme, KeyboardAvoidingView } from 'react-native'
import { SignInScreenNavigationProp } from '../navigation/navigationTypes';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action'
import Screen from '../components/UI/Screen';
import * as Colors from '../constants/Colors'
import ThemedInput from '../components/UI/ThemedInput';
import { validateEmail, validatePassword } from '../utils/validators';
import ThemedLabel from '../components/UI/ThemedLabel';
import ThemedTitle from '../components/UI/ThemedTitle';
import ThemedButton from '../components/UI/ThemedButton';

type Props = {
   navigation: SignInScreenNavigationProp
}

export const assets = [require('../assets/background-black.png'),  require('../assets/light_no_line.png')]

const LoginScreen = (props: Props) => {
   const dispatch = useDispatch()
   let colorScheme = useColorScheme();
   const [email, setEmail] = useState('test@gmail.com');
   const [emailState, setEmailState] = useState(false);
   const [password, setPassword] = useState('123456');
   const [passwordState, setPasswwordState] = useState(false)
   const signInValidation = emailState && passwordState;
   const darkMode = colorScheme === "dark";
   const {background} = Colors.getColors(darkMode);

   const emailCallback = (text: string, state:boolean) => {
      setEmail(text);
      setEmailState(state);
   }
   const passwordCallback = (text: string, state:boolean) => {
      setPassword(text);
      setPasswwordState(state);
   }
   return (
      <ImageBackground source={darkMode ? assets[0]: assets[1]} style={styles.imgBackground} resizeMode="cover" >
         <Screen style={styles.screen} withKeyboard={true} darkMode={darkMode}>
            <View style={styles.titleBox}>
               <ThemedTitle darkMode={darkMode}>Welcome</ThemedTitle>
            </View>
            <KeyboardAvoidingView style={{...styles.contentBox, ...background}} behavior={'padding'} keyboardVerticalOffset={10}>
               <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Email</ThemedLabel>
               <ThemedInput validate={validateEmail} setTextAndState={emailCallback} leftIcon="mail" validation={true} placeholder="Email..." darkMode={darkMode}/>
               <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Password</ThemedLabel>
               <ThemedInput validate={validatePassword} setTextAndState={passwordCallback} leftIcon="key-sharp" validation={true} placeholder="Password..." darkMode={darkMode}/>
               <ThemedButton title="Sign in" darkMode={darkMode} disabled={!signInValidation} onPress={() => {dispatch(userActions.asyncSignIn(email, password))}} type="confirm" style={{marginBottom: 10, width: "50%"}}/>
               <ThemedButton title="Sign up" darkMode={darkMode} disabled={false} onPress={() => { props.navigation.navigate('SignIn')}} type="confirm" style={{marginBottom: 50, width: "50%"}} />
            </KeyboardAvoidingView>
           
         </Screen>
      </ImageBackground>
   )
}

const styles = StyleSheet.create({
   screen: {
      justifyContent: 'center',
   },
   input: {
      width: '80%',
      marginBottom: 20,
   },
   imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1 
   },
   contentBox: {
      width: "100%",
      maxWidth: 400,
      borderRadius: 50,
      alignItems: "center",
      paddingVertical: 60,
   },
   titleBox: {
      marginTop: 100,
      width: "100%",
      maxWidth: 400,
   },
   text: {
      textAlign: 'left',
      width: "80%",
   }
})
export default LoginScreen;