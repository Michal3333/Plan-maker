import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons'
 
type Props = {

}

const CustomHeaderButton = (props: Props) => {
   return (
      <HeaderButton title="icom" {...props} IconComponent={Ionicons} iconSize={23}/>
   )
}



export default CustomHeaderButton;