import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'
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
      <Screen style={styles.screen}>
         <Text>Email</Text>
         <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
         <Text>Password</Text>
         <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} value={password} />
         <Button title="sign in" onPress={() => {dispatch(userActions.asyncSignIn(email, password))}}
            disabled={email === '' || password === ''} />

         <Button title="sign up" onPress={() => { props.navigation.navigate('SignIn') }} />
      </Screen>
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
   }
})
export default LoginScreen;