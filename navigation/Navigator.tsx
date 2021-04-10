import * as React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, StackNavigationProp, } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import SummaryScreen from '../screens/SummaryScreen';
import MyProjectsScreen from '../screens/MyProjectsScreen';
import OtherProjectsScreen from '../screens/OtherProjectsScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import SignInScreen from '../screens/SignInScreen';
import { LoginStackParamList, MyProjectsStackParamList, OtherProjectsStackParamList, SummaryStackParamList, TabNavigationParamList } from './navigationTypes';
import StoreProvider, { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux';

const LoginStack = createStackNavigator<LoginStackParamList>();
const AppTab = createBottomTabNavigator<TabNavigationParamList>();
const SummaryStack = createStackNavigator<SummaryStackParamList>();
const MyProjectsStack = createStackNavigator<MyProjectsStackParamList>();
const OtherProjecstStack = createStackNavigator<OtherProjectsStackParamList>();



const Navigation =  () => {
   const userData = useSelector((state: RootState) => state.user)
   return(
      <NavigationContainer >
         {!userData.isLoggedIn ?
            <Login/> 
            :
            <AppTabs/>
         }
      </NavigationContainer>
   )
}


const Login = () =>  {
   return (
      <LoginStack.Navigator>
         <LoginStack.Screen name="Login" component={LoginScreen}/>
         <LoginStack.Screen name="SignIn" component={SignInScreen}/>
      </LoginStack.Navigator>
   );
}

const AppTabs = () => {
   return (
      <AppTab.Navigator>
         <AppTab.Screen name="Summary" component={Summary}/>
         <AppTab.Screen name="MyProjetcs" component={MyProjects}/>
         <AppTab.Screen name="OtherProjects" component={OtherProjecsts}/>
      </AppTab.Navigator>
   )
   
}

const Summary = () => {
   return (
      <SummaryStack.Navigator>
         <SummaryStack.Screen name="Summary" component={SummaryScreen}/>
      </SummaryStack.Navigator>
   )
   
}

const MyProjects = () => {
   return (
      <MyProjectsStack.Navigator>
         <MyProjectsStack.Screen name="MyProjects" component={MyProjectsScreen}/>
         <MyProjectsStack.Screen name="ProjectDetails" component={ProjectDetailsScreen}/>
      </MyProjectsStack.Navigator>
   )
}

const OtherProjecsts = () => {
   return (
      <OtherProjecstStack.Navigator>
         <OtherProjecstStack.Screen name="OtherProjects" component={OtherProjectsScreen}/>
         <OtherProjecstStack.Screen name="ProjectDetails" component={ProjectDetailsScreen}/>
      </OtherProjecstStack.Navigator>
   )
}






export default Navigation;
