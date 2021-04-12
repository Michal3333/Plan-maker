import { StackNavigationProp } from "@react-navigation/stack"

export type AppDrawerParamList = {
   AppTabs: undefined
}

export type LoginStackParamList = {
   Login: undefined,
   SignIn: undefined
}

export type TabNavigationParamList = {
   Summary: SummaryStackParamList,
   MyProjetcs : MyProjectsStackParamList,
   OtherProjects: OtherProjectsStackParamList
}

export type SummaryStackParamList = {
   Summary: undefined
}

export type MyProjectsStackParamList = {
   MyProjects: undefined,
   ProjectDetails : {
      id: string
   }
}

export type OtherProjectsStackParamList = {
   OtherProjects: undefined,
   ProjectDetails : {
      id: string
   }
}

export type LoginScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Login'>
export type SignInScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'SignIn'>



