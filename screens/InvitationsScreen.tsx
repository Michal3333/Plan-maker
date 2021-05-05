import React from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, FlatList} from 'react-native'
import Screen from '../components/UI/Screen';
import InvitationElement from '../components/Invitations/InvitationElement';
type Props = {

}

const InvitationsScreen = (props: Props) => {
   const invitations = useAppSelector(state => state.invitations.invitations);
   return (
      <Screen withDrawerButton={true}>
         <FlatList style={styles.list} data={invitations} renderItem={itemData => <InvitationElement 
            id={itemData.item.id} 
            projectName={itemData.item.projectName}
            ownerEmail={itemData.item.fromMail}
            sendAnswer={(answer: boolean) => {}}/>
         }/>
      </Screen>
   )
}

const styles = StyleSheet.create({
   list: {
      width: "100%"
   }
})

export default InvitationsScreen;