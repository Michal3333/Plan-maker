import React, {useState} from 'react';
import { StyleSheet, View,  Text, Button} from 'react-native'
import { SignInScreenNavigationProp } from '../navigation/navigationTypes';
import StoreProvider, { RootState } from '../store/store'
import * as userActions from '../store/user/action'
import { useAppSelector } from '../store/store'


type Props = {
   navigation : SignInScreenNavigationProp
}

const LoginScreen = (props: Props) => {
   return (
      <View>
         <Text>Login</Text>
         <Button title="sign up" onPress={() => {props.navigation.navigate('SignIn')}}/>
         <Button title="sugn in" onPress={() => {}}/>
      </View>
   )
}

const styles = StyleSheet.create({

})

export default LoginScreen;