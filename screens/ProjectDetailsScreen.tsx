import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import Screen from '../components/UI/Screen';
import { MyProjectDetailsRouteProp } from '../navigation/navigationTypes';

type Props = {
   route: MyProjectDetailsRouteProp
}

const ProjectDetailsScreen = (props: Props) => {
   return (
      <Screen>
         <Text>{props.route.params.id}</Text>
      </Screen>
   )
}

const styles = StyleSheet.create({
  
})

export default ProjectDetailsScreen;