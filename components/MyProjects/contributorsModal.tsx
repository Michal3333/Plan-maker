import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, FlatList, Modal } from 'react-native'
import Contributor from '../../models/Contributor';
import Card from '../UI/Card';
import Screen from '../UI/Screen';
import ThemedButton from '../UI/ThemedButton';
import ThemedIcon from '../UI/ThemedIcon';
import ThemedLabel from '../UI/ThemedLabel';
import * as Colors from '../../constants/Colors'
import ThemedTitle from '../UI/ThemedTitle';
import AddContributorModal from './addContributorModal';
import ContributorItem from './ContributorItem';



type Props = {
   addConributor: (email: string, allowMessages: boolean, allowDetails: boolean) => void,
   closeModel: () => void,
   contributors : Contributor[],
   deleteContributor: (contributorId: string) => void,
   updateContributor: (contributorId: string, allowMessages: boolean, allowDetails: boolean) => void,
   darkMode: boolean,
   color: string,
   shared: boolean,
   convertToShared: () => void,
   convertToNormal: () => void

}

const ContributorsModal = (props : Props) => {
   const [email, setEmail] = useState('');
   const [addContributorModal, setAddContributorModal] = useState(false)
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(props.darkMode)

   const [tasksEditMode, setTasksEditMode] = useState(false)

   
   const editButtonText = tasksEditMode ? "Cancel" : "Edit"

   return (
      <View style={styles.modal}>
         <Modal animationType='fade'
            visible={addContributorModal} 
            transparent={true}>
               <AddContributorModal darkMode={props.darkMode} 
                  closeModal={() => {setAddContributorModal(false)}} 
                  addContributor={(mail: string, allowMessages: boolean, allowDetails: boolean) => {
                     props.addConributor(mail, allowMessages, allowDetails);
                     setAddContributorModal(false)
                  }}
               />
         </Modal>
          <Screen darkMode={props.darkMode} style={{width: '100%', marginBottom: 20, marginTop: 70}}>
            <View style={{width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
               <ThemedTitle style={{fontSize: 45}} darkMode={props.darkMode}>Contributors</ThemedTitle>
               {props.shared && false && <ThemedIcon darkMode={props.darkMode} onPress={props.convertToNormal} icon={"people-circle-sharp"} type="delete" size={40} style={{padding: 0, margin: 0}}/>}
            </View>
            <View style={{ ...styles.tasksBar}}>
               <ThemedIcon darkMode={props.darkMode} icon='ios-add' onPress={() => {setAddContributorModal(true)}} color={props.shared ? props.color : 'gray'} style={{ ...styles.addTaskIcon, backgroundColor : backgroundLighter}} size={35} />
               
               <ThemedButton darkMode={props.darkMode} onPress={() => {setTasksEditMode((mode) => !mode)}} disabled={!props.shared} title={editButtonText} type='confirm' style={{paddingHorizontal: 20, marginLeft: 5, backgroundColor: backgroundLighter}}/>
            </View>
            {props.contributors.length > 0 ?
               <View style={styles.list}>
                  {
                     <FlatList data={props.contributors} renderItem={(itemData) => <ContributorItem
                        darkMode={props.darkMode}
                        mail={itemData.item.contributorMail}
                        allowDetails={itemData.item.allowDetails}
                        allowMessages={itemData.item.allowMessage}
                        status={itemData.item.status}
                        delete={() => {
                           props.deleteContributor(itemData.item.id)
                        }}
                        editMode={tasksEditMode}
                        updateContributor={(allowMessages: boolean, allowDetails: boolean) => {
                           props.updateContributor(itemData.item.id ,allowMessages, allowDetails)
                        }}
                     />}/>
                     // <FlatList data={props.contributors} renderItem={(itemData) => <Text>asdasdasd</Text>}/>
                  }
               </View>
               :
               <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundLighter, width: '100%', marginTop: 10, borderRadius: 20, flex: 1}}>
                  <ThemedLabel style={{fontSize: 20}} darkMode={props.darkMode}>{props.shared ? "No Contributors" : "Project not shared"}</ThemedLabel>
                  {!props.shared && <ThemedButton title={'Convert to shared'} darkMode={props.darkMode} onPress={props.convertToShared} disabled={false} type="confirm" style={{backgroundColor : backgroundLighter, paddingHorizontal: 20, marginTop: 20}}/>}
               </View>
            }
            <View style={styles.buttonsBox}>
               <ThemedButton title="Close" 
                  darkMode={props.darkMode} 
                  disabled={false} 
                  onPress={() => props.closeModel()}
                  type="confirm" 
                  style={{ width: "100%", backgroundColor: backgroundLighter, marginBottom: 30}}/>
            </View>
         </Screen>
        
      </View>
      
   )
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '80%',
      marginBottom: 20
   },
   modal: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'black',
      height: '100%',
      justifyContent: 'center'
   },
   tasksBar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%'
   },
   list : {
      width: '100%',
      marginTop: 10,
      flex : 1,
      backgroundColor: 'black',
      borderRadius: 20,
      // paddingHorizontal: 5
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      maxWidth: 400,
      // marginBottom: 40
   },
   addTaskIcon: {
      padding: 2, 
      paddingHorizontal: 15,  
      margin: 0, 
      backgroundColor: 'black', 
      borderRadius: 20
   },
})

export default ContributorsModal;