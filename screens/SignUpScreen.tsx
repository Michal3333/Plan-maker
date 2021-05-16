import React, {useState} from 'react';
import { StyleSheet, View,  Text, TextInput, Button, KeyboardAvoidingView, useColorScheme, ImageBackground} from 'react-native'
import { LoginScreenNavigationProp } from '../navigation/navigationTypes';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action'
import Screen from '../components/UI/Screen';
import ThemedLabel from '../components/UI/ThemedLabel';
import ThemedInput from '../components/UI/ThemedInput';
import ThemedButton from '../components/UI/ThemedButton';
import * as Colors from '../constants/Colors'
import { createConfirmPasswordValidator, validateEmail, validatePassword } from '../utils/validators';


export const assets = [ require('../assets/dark_reverse.png'), require('../assets/light_reverse.png'),]


type Props = {
   navigation : LoginScreenNavigationProp
}

const SignInScreen = (props: Props) => {
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";

   const [email, setEmail] = useState('');
   const [emailState, setEmailState] = useState(false);

   const [password, setPassword] = useState('');
   const [passwordState, setPasswordState] = useState(false)

   const [password1, setPassword1] = useState('');
   const [password1State, setPassword1State] = useState(false)


   const dispatch = useDispatch()
   const {background} = Colors.getColors(darkMode);

   const emailCallback = (text: string, state:boolean) => {
      setEmail(text);
      setEmailState(state);
   }
   const passwordCallback = (text: string, state:boolean) => {
      setPassword(text);
      setPasswordState(state);
   }
   const password1Callback = (text: string, state:boolean) => {
      setPassword1(text);
      setPassword1State(state);
   }
   const signUpValidation = emailState && passwordState && password1State;

   const validateConfirmPassword = createConfirmPasswordValidator(password)

   return (
      <ImageBackground source={darkMode ? assets[0]: assets[1]} style={styles.imgBackground} resizeMode="cover" >
         <Screen style={styles.screen} withKeyboard={true}>
         <KeyboardAvoidingView style={{...styles.contentBox, ...background}} behavior={'padding'} keyboardVerticalOffset={100}>
               <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Email</ThemedLabel>
               <ThemedInput validate={validateEmail} setTextAndState={emailCallback} leftIcon="mail" validation={true} placeholder="Email..." darkMode={darkMode}/>
               <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Password</ThemedLabel>
               <ThemedInput validate={validatePassword} setTextAndState={passwordCallback} leftIcon="key-sharp" validation={true} placeholder="Password..." darkMode={darkMode}/>
               <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Confirm Password</ThemedLabel>
               <ThemedInput validate={validateConfirmPassword} setTextAndState={password1Callback} leftIcon="key-sharp" validation={true} placeholder="Confirm Password..." darkMode={darkMode}/>
               <ThemedButton title="Sign up" darkMode={darkMode} disabled={!signUpValidation} onPress={() => { dispatch(userActions.asyncSignUp(email, password))}} type="confirm" style={{marginBottom: 50, width: "50%"}}/>
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

export default SignInScreen;