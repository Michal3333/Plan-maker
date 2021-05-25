import React, { useRef } from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Animated, Image, useWindowDimensions, useColorScheme} from 'react-native'
import Screen from '../components/UI/Screen';
import InvitationElement from '../components/Invitations/InvitationElement';
import * as InvitationsActions from '../store/invitations/action'
import { useFocusEffect } from '@react-navigation/native';
import ThemedTitle from '../components/UI/ThemedTitle';
type Props = {

}

export const assets = [require('../assets/headerColors1.png')]

const InvitationsScreen = (props: Props) => {
   const invitations = useAppSelector(state => state.invitations.invitations);
   const dispatch = useDispatch()
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";

   return (
      <Screen style={{padding: 0}} headerImage={true} darkMode={darkMode}>
         <FlatList style={styles.list} data={invitations} renderItem={itemData => <InvitationElement 
            id={itemData.item.id} 
            projectName={itemData.item.projectName}
            ownerEmail={itemData.item.fromMail}
            sendAnswer={(answer: boolean) => {
               dispatch(InvitationsActions.asyncAnswerInvitation(itemData.item.id, answer))
            }}
            darkMode={darkMode}
            />
         }
         ListHeaderComponent={<ThemedTitle style={{fontSize: 50}} darkMode={darkMode}>Invitations</ThemedTitle>}/>
      </Screen>
   )
}

const styles = StyleSheet.create({
   list: {
      width: "100%",
      padding: 10
   }
})

export default InvitationsScreen;