import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, useColorScheme } from 'react-native'
import { SignInScreenNavigationProp } from '../navigation/navigationTypes';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action'
import Screen from '../components/UI/Screen';
import MainButton from '../components/UI/MainButton';
import * as Colors from '../constants/Colors'


const getColors = (darkMode: boolean) => {
   if(darkMode){
      return {
         titleColor: {color: 'white'},
         textColor: {color: 'white'},
         background: {backgroundColor: Colors.mainBlack},
         border: {
            borderColor: 'black',
            borderWidth: 7,
         },
         borderBottom: {
            borderBottomColor: 'black',
            borderBottomWidth: 3,
         }
      }
   } else {
      return {
         titleColor: {color: 'white'},
         textColor: {color: 'black'},
         background: {backgroundColor: Colors.mainWhite},
         border: {
            borderColor: 'white',
            borderWidth: 7,
         },
         borderBottom: {
            borderBottomColor: 'white',
            borderBottomWidth: 3,
         }
      }
   }

}


type Props = {
   navigation: SignInScreenNavigationProp
}

export const assets = [require('../assets/dark_with_line.png'),  require('../assets/light_with_line.png')]

const LoginScreen = (props: Props) => {
   const dispatch = useDispatch()
   let colorScheme = useColorScheme();
   const [email, setEmail] = useState('test@gmail.com');
   const [password, setPassword] = useState('123456');
   const darkMode = colorScheme === "dark";
   const {background, border, textColor, titleColor, borderBottom} = getColors(darkMode)

   return (
      <ImageBackground source={darkMode ? assets[0]: assets[1]} style={styles.imgBackground} resizeMode="cover" >
         <Screen style={styles.screen} withKeyboard={true}>
            <View style={styles.titleBox}>
               <Text style={{...styles.titleText, ...titleColor}}>Welcome</Text>
            </View>
            <View style={{...styles.contentBox, ...background, ...border}}>
               <Text style={{...styles.text, ...textColor}}>Email</Text>
               <TextInput style={{...styles.input, ...textColor, ...borderBottom}} onChangeText={(text) => setEmail(text)} value={email} />
               <Text style={{...styles.text, ...textColor}}>Password</Text>
               <TextInput style={{...styles.input, ...textColor, ...borderBottom}} onChangeText={(text) => setPassword(text)} value={password} />
               <Button title="Sign in" onPress={() => {dispatch(userActions.asyncSignIn(email, password))}}
                  disabled={email === '' || password === ''} color={darkMode ? 'white' : 'black'}/>

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
      height: 40,
      width: '80%',
      marginBottom: 20,
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
      borderRadius: 50,
      alignItems: "center",
      paddingVertical: 60,
   },
   titleBox: {
      width: "100%",
      maxWidth: 400,

   },
   titleText: {
      fontFamily: 'source-sans-pro-bold',
      fontSize: 70,
      fontWeight: '900',
      textShadowColor: 'black',
      textShadowRadius: 3
   },
   text: {
      textAlign: 'left',
      width: "80%",
      fontFamily: 'open-sans-bold',
      fontSize: 20,
   }
})
export default LoginScreen;