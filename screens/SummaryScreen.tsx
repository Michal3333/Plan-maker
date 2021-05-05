import React, {useEffect} from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Button} from 'react-native'
import Screen from '../components/UI/Screen';
import { keepGettingNotifications } from '../API/notifications';
// import { testRules } from '../API/myProjects';
import * as NotificationActions from '../store/notifications/action'
import * as InvitationActions from '../store/invitations/action'

type Props = {

}

const SummaryScreen = (props: Props) => {
   const userData = useAppSelector(state => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(NotificationActions.asyncKeepGettingNotifications())
      dispatch(InvitationActions.asyncKeepGettingInvitations())
   }, [])

   return (
      <Screen withDrawerButton={true}>
         <Text>{userData.id}</Text>
         {/* <Button title="Test rules" onPress={() => {testRules()}}/> */}
      </Screen>
   )
}

const styles = StyleSheet.create({

})

export default SummaryScreen;