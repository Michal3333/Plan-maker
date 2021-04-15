import React, {useState} from 'react';
import { StyleSheet, View,  Text, TextInput, Button} from 'react-native'
import { LoginScreenNavigationProp } from '../navigation/navigationTypes';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action'
import Screen from '../components/UI/Screen';



type Props = {
   navigation : LoginScreenNavigationProp
}

const SignInScreen = (props: Props) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [password1, setPassword1] = useState('');

   const dispatch = useDispatch()

   return (
      <Screen style={styles.screen}>
         <Text>Email</Text>
         <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} value={email}/>
         <Text>Password</Text>
         <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} value={password}/>
         <Text>Password2</Text>
         <TextInput style={styles.input} onChangeText={(text) => setPassword1(text)} value={password1}/>
         <Button  title="sign in" onPress={() => {
            dispatch(userActions.asyncSignUp(email, password))
         }}
         disabled={password !== password1 || password === '' || email === ''}/>
      </Screen>
   )
}

const styles = StyleSheet.create({
   screen: {
      justifyContent: 'center',
   },
   input : {
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '80%',
      marginBottom: 20
   }
})

export default SignInScreen;