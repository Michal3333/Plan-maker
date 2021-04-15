import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'
import { SignInScreenNavigationProp } from '../navigation/navigationTypes';
import StoreProvider, { RootState } from '../store/store'
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action'
import { useAppSelector } from '../store/store'
import LoadingIndicator from '../components/UI/LoadingIndicator';
import { LoadingScreen } from '../components/UI/Screen'


type Props = {
   navigation: SignInScreenNavigationProp
}

const LoginScreen = (props: Props) => {
   const [email, setEmail] = useState('test@gmail.com');
   const [password, setPassword] = useState('123456');
   const dispatch = useDispatch()

   const login = async () => {
      const result = await dispatch(userActions.asyncSignIn(email, password))
      console.log(result)

   }

   return (
      <View style={styles.screen}>
         <Text>Email</Text>
         <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
         <Text>Password</Text>
         <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} value={password} />
         <Button title="sign in" onPress={login}
            disabled={email === '' || password === ''} />

         <Button title="sign up" onPress={() => { props.navigation.navigate('SignIn') }} />

      </View>
   )
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      alignItems: 'center'
   },
   input: {
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '80%',
      marginBottom: 20
   }
})
export default LoadingScreen(LoginScreen);