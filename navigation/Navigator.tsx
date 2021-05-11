import React from 'react';
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
import { DrawerActions, StackActions, TabActions, CommonActions} from '@react-navigation/native';
import SplashScreen from '../screens/SpalshScreen';
import MessagesScreen from '../screens/MessagesScreen';
import InvitationsScreen from '../screens/InvitationsScreen';
import { Ionicons } from '@expo/vector-icons';


const AppDrawerNavigator = createDrawerNavigator<AppDrawerParamList>();
const LoginStack = createStackNavigator<LoginStackParamList>();
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
   logOut: () => void
}

const Navigation = (props: Props) => {
   if (props.appLoaded) {
      return <SplashScreen />
   }
   return (
      <NavigationContainer >
         {!props.isLoggedIn ?
            <Login/>
            :
            <AppDrawer logOut={props.logOut} />
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
   return (
      <LoginStack.Navigator screenOptions={defaultStackOptions}>
         <LoginStack.Screen name="Login" component={LoginScreen}/>
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
