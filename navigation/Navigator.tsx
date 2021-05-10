import React, { useState, useEffect } from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, StackNavigationProp, } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerNavigationOptions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AppDrawerParamList, InvitationsStackParamList, LoginStackParamList, MessagesStackParamList, MyProjectsStackParamList, NotificationTabNavigationParamList, OtherProjectsStackParamList, SummaryStackParamList, TabNavigationParamList } from './navigationTypes';
import LoginScreen from '../screens/LoginScreen';
import SummaryScreen from '../screens/SummaryScreen';
import MyProjectsScreen from '../screens/MyProjectsScreen';
import OtherProjectsScreen from '../screens/OtherProjectsScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import SignInScreen from '../screens/SignUpScreen';
import { RootState, useAppSelector } from '../store/store'
import {Image} from 'react-native'
import { useDispatch } from 'react-redux';
import { DrawerActions, StackActions, TabActions, CommonActions} from '@react-navigation/native';
import * as Font from 'expo-font'



import SplashScreen from '../screens/SpalshScreen';
import * as SecureStore from 'expo-secure-store';
import * as userActions from '../store/user/action'
import { checkIfUserSignIn } from '../API/authorisation';
import MessagesScreen from '../screens/MessagesScreen';
import InvitationsScreen from '../screens/InvitationsScreen';
import { Ionicons } from '@expo/vector-icons';
// import CustomDrawerContent from './CustomDrawer';


const AppDrawerNavigator = createDrawerNavigator<AppDrawerParamList>();
const LoginStack = createStackNavigator<LoginStackParamList>();
const AppTab = createBottomTabNavigator<TabNavigationParamList>();
const SummaryStack = createStackNavigator<SummaryStackParamList>();
const MyProjectsStack = createStackNavigator<MyProjectsStackParamList>();
const OtherProjecstStack = createStackNavigator<OtherProjectsStackParamList>();
const NotificationsTab = createBottomTabNavigator<NotificationTabNavigationParamList>();
const MessagesStack = createStackNavigator<MessagesStackParamList>();
const InvitationsStack = createStackNavigator<InvitationsStackParamList>();



const Navigation = () => {
   const userData = useAppSelector((state) => state.user);
   const [isLoading, setIsLoading] = useState(true);
   const dispatch = useDispatch()

   useEffect(() => {
      async function fetchKey() {
         console.log('checking if logged in');
         const user = await checkIfUserSignIn()
         if (user) {
            dispatch(userActions.signInAction(user.uid, user.email as string))
         }
         await Font.loadAsync({
            'open-sans' : require('../assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold' : require('../assets/fonts/OpenSans-Bold.ttf')
         })
         setIsLoading(false)
      }
      fetchKey()
   }, [])

   const logOut = () => {
      dispatch(userActions.asyncSignOut())
   }

   if (isLoading) {
      return <SplashScreen />
   }

   return (
      <NavigationContainer >
         {!userData.isLoggedIn ?
            <Login isLoggedIn={userData.isLoggedIn}/>
            :
            <AppDrawer logOut={logOut} />
         }
      </NavigationContainer>
   )
}

const AppDrawer = (props: any) => (
   <AppDrawerNavigator.Navigator drawerContent={(drawerProps) => <CustomDrawerContent {...drawerProps} logOut={props.logOut} />}>
      <AppDrawerNavigator.Screen name="AppTabs" component={AppTabs} />
      <AppDrawerNavigator.Screen name="NotificationsTab" component={NotificationsTabs} />
   </AppDrawerNavigator.Navigator>
)


const Login = (props: any) => {
   console.log(props.isLoggedIn)
   return (
      <LoginStack.Navigator screenOptions={defaultStackOptions}>
         <LoginStack.Screen name="Login" component={LoginScreen} options={{animationTypeForReplace: props.isLoggedIn ? 'pop' : 'push'}}/>
         <LoginStack.Screen name="SignIn" component={SignInScreen} />
      </LoginStack.Navigator>
   );
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

function CustomDrawerContent(props: any) {
   return (
      <DrawerContentScrollView {...props}>
         <DrawerItemList {...props} />
         <DrawerItem
            label="Log out"
            onPress={() => {
               // props.navigation.dispatch(DrawerActions.toggleDrawer())
               props.navigation.dispatch(DrawerActions.jumpTo('AppTabs'))
               props.logOut()
            }}
         />
      </DrawerContentScrollView>
   );
}

const defaultStackOptions: StackNavigationOptions = {
   headerStyle: {
      backgroundColor: '#1D272B',
   },
   headerTitleStyle: {
      fontFamily: 'open-sans-bold',
   },
   headerBackTitleStyle: {
      fontFamily: 'open-sans',
   },
   headerTintColor: "#264653",
}






export default Navigation;
