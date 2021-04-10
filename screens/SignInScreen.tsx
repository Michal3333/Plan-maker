import React from 'react';
import { StyleSheet, View,  Text} from 'react-native'
import { LoginScreenNavigationProp } from '../navigation/navigationTypes';

type Props = {
   navigation : LoginScreenNavigationProp
}

const SignInScreen = (props: Props) => {
   return (
      <View>
         <Text>Sign In</Text>
      </View>
   )
}

const styles = StyleSheet.create({

})

export default SignInScreen;