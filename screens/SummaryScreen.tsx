import React, {useEffect} from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Button} from 'react-native'
import Screen from '../components/UI/Screen';
import { keepGettingNotifications } from '../API/notifications';
// import { testRules } from '../API/myProjects';
import * as userActions from '../store/user/action';
import { useNavigation } from '@react-navigation/native';
import { SummaryNavigationProp } from '../navigation/navigationTypes';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/CustomHeader';


type Props = {

}

const SummaryScreen = (props: Props) => {
   const userData = useAppSelector(state => state.user);
   const dispatch = useDispatch();
   const navigation = useNavigation<SummaryNavigationProp>();
   const logOut = () => {
      dispatch(userActions.asyncSignOut())
   }

   useEffect(() => {
      navigation.setOptions({
         headerRight : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
               <Item title='log out' iconName={'log-out'} color="#264653" onPress={logOut}/>
            </HeaderButtons>
         )
      })
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