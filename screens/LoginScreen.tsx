import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, useColorScheme } from 'react-native'
import { SignInScreenNavigationProp } from '../navigation/navigationTypes';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action'
import Screen from '../components/UI/Screen';
import MainButton from '../components/UI/MainButton';
import * as Colors from '../constants/Colors'
import ThemedInput from '../components/UI/ThemedInput';
import { validateEmail, validatePassword } from '../utils/validators';
import ThemedLabel from '../components/UI/ThemedLabel';
import ThemedTitle from '../components/UI/ThemedTitle';

type Props = {
   navigation: SignInScreenNavigationProp
}

export const assets = [require('../assets/background-black.png'),  require('../assets/light_no_line.png'),]

const LoginScreen = (props: Props) => {
   const dispatch = useDispatch()
   let colorScheme = useColorScheme();
   const [email, setEmail] = useState('test@gmail.com');
   const [emailState, setEmailState] = useState(false);
   const [password, setPassword] = useState('123456');
   const [passwordState, setPasswwordState] = useState(false)
   const signInValidation = emailState && passwordState;
   const darkMode = colorScheme === "dark";
   const {background, border, textColor, titleColor, borderBottom} = Colors.getColors(darkMode);

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
         <Screen style={styles.screen} withKeyboard={true}>
            <View style={styles.titleBox}>
               <ThemedTitle darkMode={darkMode}>Welcome</ThemedTitle>
            </View>
            <View style={{...styles.contentBox, ...background,}}>
               <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Email</ThemedLabel>
               <ThemedInput validate={validateEmail} setTextAndState={emailCallback} leftIcon="mail" validation={true} placeholder="Email..." darkMode={darkMode}/>
               <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Password</ThemedLabel>
               <ThemedInput validate={validatePassword} setTextAndState={passwordCallback} leftIcon="key-sharp" validation={true} placeholder="Password..." darkMode={darkMode}/>
               <Button title="Sign in" onPress={() => {dispatch(userActions.asyncSignIn(email, password))}}
                  disabled={!(emailState && passwordState)} color={darkMode ? 'white' : 'black'} />
               <Button title="Sign up" onPress={() => { props.navigation.navigate('SignIn') }} color={darkMode ? 'white' : 'black'}/>
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