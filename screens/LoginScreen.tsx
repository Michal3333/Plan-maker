import React from 'react';
import { StyleSheet, View,  Text, Button} from 'react-native'
import { SignInScreenNavigationProp } from '../navigation/navigationTypes';
import StoreProvider, { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../store/user/action'

type Props = {
   navigation : SignInScreenNavigationProp
}

const LoginScreen = (props: Props) => {
   const dispatch = useDispatch()
   return (
      <View>
         <Text>Login</Text>
         <Button title="sign in" onPress={() => {props.navigation.navigate('SignIn')}}/>
         <Button title="log in" onPress={() => dispatch(userActions.changeLoggedIn(true))}/>
      </View>
   )
}

const styles = StyleSheet.create({

})

export default LoginScreen;