import { OtherProjectsActions, OtherProjectsState, UserActions } from "../types";
import { USER_ACTION_TYPES } from "../user/action";
import { OTHER_PROJECTS_ACTION_TYPES } from "./action";

const initialState : OtherProjectsState = {
   otherProjects: [],
   unsubscribe: null
}

export default (state = initialState, action: OtherProjectsActions | UserActions) : OtherProjectsState => {
   switch(action.type) {
      case OTHER_PROJECTS_ACTION_TYPES.ADD_OTHER_PROJECT:
         return {
            ...state,
            otherProjects: [...state.otherProjects, action.otherProject]
         }
      case OTHER_PROJECTS_ACTION_TYPES.UPDATE_OTHER_PROJECT:
         return {
            ...state,
            otherProjects: state.otherProjects.map(x => {
               if(action.otherProject.id === x.id){
                  return {
                     ...action.otherProject
                  }
               }
               return x;
            })
         }
      case OTHER_PROJECTS_ACTION_TYPES.INIT_OTHER_PROJECTS:
         return {
            ...state,
            unsubscribe : action.unsubscribe
         }
      case USER_ACTION_TYPES.SIGN_OUT:
         if(state.unsubscribe){
            state.unsubscribe()
         } else {
            console.log('no unsubscribe')
         }
         return initialState
      case OTHER_PROJECTS_ACTION_TYPES.DELETE_OTHER_PROJECT:
         return {
            ...state,
            otherProjects: state.otherProjects.filter(x => {
               return x.id !== action.otherProjectId;
            })
         }
   }
   return state;
} 