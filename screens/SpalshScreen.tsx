import React from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text} from 'react-native'

type Props = {

}

const SplashScreen = (props: Props) => {
   const userData = useAppSelector(state => state.user)
   return (
      <View>
         <Text>Splash screen</Text>
      </View>
   )
}

const styles = StyleSheet.create({

})

export default SplashScreen;