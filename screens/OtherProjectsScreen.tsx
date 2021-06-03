import React from 'react';
import { FlatList, StyleSheet, useColorScheme, View,  } from 'react-native'
import { useAppSelector,  } from '../store/store'

import Screen from '../components/UI/Screen';
import OtherProjectBox from '../components/OtherProjects/OtherProjectBox';
import { OtherProjectsNavigationProp } from '../navigation/navigationTypes';
import ThemedTitle from '../components/UI/ThemedTitle';

type Props = {
   navigation : OtherProjectsNavigationProp
}

const OtherProjectsScreen = (props: Props) => {
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   const otherProjects = useAppSelector(state => state.otherProjects.otherProjects);
   return (
      <Screen darkMode={false}  headerImage={true} >
          <View style={styles.list}>
            <FlatList 
               data={otherProjects} 
               renderItem={(itemData) => <OtherProjectBox id={itemData.item.id} 
                  name={itemData.item.name} 
                  openDetails={() => {props.navigation.navigate('ProjectDetails', {id: itemData.item.id})}}
                  darkMode={darkMode}
                  goal={itemData.item.weeklyLimit}
                  done={itemData.item.weeklyDone}
                  color={itemData.item.color}
                  total={itemData.item.totalHours}
                  owner={itemData.item.ownerMail}
                  allowDetails={itemData.item.allowDetails}
                  allowMessages={itemData.item.allowNotification}
               />}
               ListHeaderComponent={<ThemedTitle style={{fontSize: 50}} darkMode={darkMode}>Other Projects</ThemedTitle>}
            />
         </View>
      </Screen>
   )
}

const styles = StyleSheet.create({
   list: {
      width: '100%',
      flex : 1
   },
})

export default OtherProjectsScreen;