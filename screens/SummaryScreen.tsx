import React, {useEffect} from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Button} from 'react-native'
import Screen from '../components/UI/Screen';
import { keepGettingNotifications } from '../API/notifications';
// import { testRules } from '../API/myProjects';

type Props = {

}

const SummaryScreen = (props: Props) => {
   const userData = useAppSelector(state => state.user);

   useEffect(() => {
      keepGettingNotifications(userData.id, () => {})
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