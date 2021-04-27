import React from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text} from 'react-native'
import Screen from '../components/UI/Screen';

type Props = {

}

const InvitationsScreen = (props: Props) => {
   const userData = useAppSelector(state => state.user)
   return (
      <Screen withDrawerButton={true}>
         <Text>InvitationsScreen</Text>
      </Screen>
   )
}

const styles = StyleSheet.create({

})

export default InvitationsScreen;