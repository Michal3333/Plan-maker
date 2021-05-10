import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native'
import { SignInScreenNavigationProp } from '../navigation/navigationTypes';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action'
import Screen from '../components/UI/Screen';




type Props = {
   navigation: SignInScreenNavigationProp
}


const LoginScreen = (props: Props) => {
   const dispatch = useDispatch()

   const [email, setEmail] = useState('test@gmail.com');
   const [password, setPassword] = useState('123456');

   return (
      <ImageBackground source={require('../assets/background1.png')} style={styles.imgBackground} resizeMode='cover' >
         <Screen style={styles.screen} withKeyboard={true}>
            <View style={styles.contentBox}>
               <Text>Email</Text>
               <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
               <Text>Password</Text>
               <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} value={password} />
               <Button title="sign in" onPress={() => {dispatch(userActions.asyncSignIn(email, password))}}
                  disabled={email === '' || password === ''} />

               <Button title="sign up" onPress={() => { props.navigation.navigate('SignIn') }} />
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
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '80%',
      marginBottom: 20
   },
   imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1 
   },
   contentBox: {
      width: "100%",
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: "center",
      paddingVertical: 40
   }
})
export default LoginScreen;