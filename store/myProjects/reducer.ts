import { MyProjectsActions, MyProjectsState, UserActions } from "../types";
import { USER_ACTION_TYPES } from "../user/action";
import { MY_PROJECTS_ACTION_TYPES } from "./action";

const initialState : MyProjectsState = {
   projects: []
}

export default (state = initialState, acton: MyProjectsActions | UserActions) : MyProjectsState => {
   switch(acton.type) {
      case MY_PROJECTS_ACTION_TYPES.ADD_PROJECT:
         return {
            projects: [...state.projects, acton.project]
         }
      case MY_PROJECTS_ACTION_TYPES.SET_PROJECTS:
         return {
            projects: [...acton.projects]
         }
      case USER_ACTION_TYPES.SIGN_OUT:
         return {
            ...initialState
         }
      case MY_PROJECTS_ACTION_TYPES.REMOVE_PROJECT:
         const id = acton.projectId;
         return {
            projects: state.projects.filter(x => x.id !== id)
         }
      case MY_PROJECTS_ACTION_TYPES.CONVERT_TO_SHARED:
         const projectShared = acton.sharedProject;
         return {
            projects : state.projects.map(x => {
               if(x.id === projectShared.id){
                  // x.setContributors([])
                  return {
                     ...x,
                     shared: true,
                  }
               }
               return x;
            })
         }
      case MY_PROJECTS_ACTION_TYPES.CONVERT_TO_NORMAL:
         const projectNormal = acton.normalProject;
         return {
            projects : state.projects.map(x => {
               if(x.id === projectNormal.id){
                  // x.setNotShared();
                  return {
                     ...x,
                     shared: false,
                     contributors : []
                  }
               }
               return x;
            })
         }
      case MY_PROJECTS_ACTION_TYPES.ADD_CONTRIBUTOR:
         const idToAdd = acton.projectId
         return {
            projects: state.projects.map(x => {
               if(x.id === idToAdd){
                  return {
                     ...x,
                     contributors: [...x.contributors, acton.contributor]
                  }
               }
               return x
            })
         }
      case MY_PROJECTS_ACTION_TYPES.ADD_TIME:
         const timeToAdd = acton.time;
         return {
            ...state,
            projects : state.projects.map(x => {
               if(x.id === acton.projectId){
                  return {
                     ...x,
                     weeklyDone: x.weeklyDone + timeToAdd,
                     totalHours: x.totalHours + timeToAdd
                  }
               }
               return x;
            })
         }
   }
   return state;
} 
