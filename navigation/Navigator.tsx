import React from 'react';
import { NavigationContainer, RouteProp, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, StackNavigationProp, } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerNavigationOptions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MainStackParamList, InvitationsStackParamList, LoginStackParamList, MessagesStackParamList, MyProjectsStackParamList, NotificationTabNavigationParamList, OtherProjectsStackParamList, SummaryStackParamList, TabNavigationParamList, AppStackParamList, SetttingStackParamList } from './navigationTypes';
import LoginScreen from '../screens/LoginScreen';
import SummaryScreen from '../screens/SummaryScreen';
import MyProjectsScreen from '../screens/MyProjectsScreen';
import OtherProjectsScreen from '../screens/OtherProjectsScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import SignInScreen from '../screens/SignUpScreen';
import { DrawerActions, StackActions, TabActions, CommonActions} from '@react-navigation/native';
import MessagesScreen from '../screens/MessagesScreen';
import InvitationsScreen from '../screens/InvitationsScreen';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading'
import * as Colors from '../constants/Colors'
import SettingsScreen from '../screens/SettingsScreen';

const MainStack = createStackNavigator<MainStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const LoginStack = createStackNavigator<LoginStackParamList>();
const SettingsStack = createStackNavigator<SetttingStackParamList>()
const AppTab = createBottomTabNavigator<TabNavigationParamList>();
const SummaryStack = createStackNavigator<SummaryStackParamList>();

const MyProjectsStack = createStackNavigator<MyProjectsStackParamList>();

const OtherProjecstStack = createStackNavigator<OtherProjectsStackParamList>();
const NotificationsTab = createBottomTabNavigator<NotificationTabNavigationParamList>();
const MessagesStack = createStackNavigator<MessagesStackParamList>();
const InvitationsStack = createStackNavigator<InvitationsStackParamList>();

type Props = {
   appLoaded: boolean,
   isLoggedIn : boolean,
   theme: string
}

const Navigation = (props: Props) => {

   if (props.appLoaded) {
      return <AppLoading />
   }
   const myDark = {
      ...DarkTheme,
      colors: {
         ...DarkTheme.colors,
         card: 'black',
         text: 'white',
         background: 'black',
         primary: Colors.primary
      }
   }
   const myLight = {
      ...DefaultTheme,
      colors: {
         ...DefaultTheme.colors,
         card: 'white',
         text: 'black',
         primary: Colors.primary
      }
   }
   
   return (
      <NavigationContainer theme={props.theme === "dark" ? myDark : myLight} >
         <MainStack.Navigator  screenOptions={{
               headerShown: false,
               
         }}>
         {!props.isLoggedIn ?
            <MainStack.Screen name="Auth" component={Login} />
            :
            <MainStack.Screen name="App" component={AppNavigator}/>
         }
         </MainStack.Navigator>
        
      </NavigationContainer>
   )
}



const Login = (props: any) => {
   return (
      <LoginStack.Navigator screenOptions={defaultStackOptions}>
         <LoginStack.Screen name="Login" component={LoginScreen}/>
         <LoginStack.Screen name="SignIn" component={SignInScreen} />
      </LoginStack.Navigator>
   );
}

const AppNavigator = () => {
   return (
      <AppStack.Navigator screenOptions={{...defaultStackOptions, headerShown: false}}>
         <AppStack.Screen name="Tab" component={AppTabs}/>
         <AppStack.Screen name="Notifications" component={NotificationsTabs}/>
         <AppStack.Screen name="Settings" component={Settings}/>
      </AppStack.Navigator>
   )
}

const AppTabs = () => {
   return (
      <AppTab.Navigator >
         <AppTab.Screen name="Summary" component={Summary} options={{tabBarIcon: conf => <Ionicons name="ios-analytics" size={25} color={conf.color}/>}}/>
         <AppTab.Screen name="MyProjetcs" component={MyProjects} options={{tabBarIcon: conf => <Ionicons name="ios-albums-outline" size={25} color={conf.color}/>}}/>
         <AppTab.Screen name="OtherProjects" component={OtherProjecsts} options={{tabBarIcon: conf => <Ionicons name="ios-eye" size={25} color={conf.color}/>}}/>
      </AppTab.Navigator>
   )

}

const Summary = () => {
   return (
      <SummaryStack.Navigator screenOptions={defaultStackOptions}>
         <SummaryStack.Screen name="Summary" component={SummaryScreen} />
      </SummaryStack.Navigator>
   )
}

const Settings = () => {
   return (
      <SettingsStack.Navigator screenOptions={defaultStackOptions}>
         <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      </SettingsStack.Navigator>
   )
}

const MyProjects = () => {
   return (
      <MyProjectsStack.Navigator screenOptions={defaultStackOptions}>
         <MyProjectsStack.Screen name="MyProjects" component={MyProjectsScreen} />
         <MyProjectsStack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      </MyProjectsStack.Navigator>
   )
}

const OtherProjecsts = () => {
   return (
      <OtherProjecstStack.Navigator screenOptions={defaultStackOptions}>
         <OtherProjecstStack.Screen name="OtherProjects" component={OtherProjectsScreen} />
         <OtherProjecstStack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      </OtherProjecstStack.Navigator>
   )
}

const  Messages = () => {
   return (
      <MessagesStack.Navigator screenOptions={defaultStackOptions}>
         <MessagesStack.Screen name='Messages' component={MessagesScreen}/>
      </MessagesStack.Navigator>
   )
}

const  Invitations = () => {
   return (
      <InvitationsStack.Navigator screenOptions={defaultStackOptions}>
         <InvitationsStack.Screen name='Invitations' component={InvitationsScreen}/>
      </InvitationsStack.Navigator>
   )
}

const NotificationsTabs = () => {
   return (
      <NotificationsTab.Navigator>
         <NotificationsTab.Screen name="Messages" component={Messages} options={{tabBarIcon: conf => <Ionicons name="ios-chatbubble-ellipses-sharp" size={25} color={conf.color}/>}}/>
         <NotificationsTab.Screen name="Invitations" component={Invitations} options={{tabBarIcon: conf => <Ionicons name="ios-people-circle" size={25} color={conf.color}/>}}/>
      </NotificationsTab.Navigator>
   )
}
const defaultStackOptions: StackNavigationOptions =  {
   headerStyle: {
      // backgroundColor: props.theme === "light" ? 'white' : '#141418',
      // shadowColor: 'transparent'
   },
   headerTitleStyle: {
      fontFamily: 'open-sans-bold',
   },
   headerBackTitleStyle: {
      fontFamily: 'open-sans',
   },
   // headerTintColor: props.theme === "dark" ? 'white' : '#141418',
}








export default Navigation;
