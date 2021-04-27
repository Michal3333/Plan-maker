import React from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text} from 'react-native'
import Screen from '../components/UI/Screen';

type Props = {

}

const MessagesScreen = (props: Props) => {
   const userData = useAppSelector(state => state.user)
   return (
      <Screen>
         <Text>MessagesScreen</Text>
      </Screen>
   )
}

const styles = StyleSheet.create({

})

export default MessagesScreen;