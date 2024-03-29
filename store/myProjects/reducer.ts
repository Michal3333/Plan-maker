import MyProject from "../../models/MyProject";
import { MyProjectsActions, MyProjectsState, sortID, UserActions } from "../types";
import { USER_ACTION_TYPES } from "../user/action";
import { MY_PROJECTS_ACTION_TYPES } from "./action";

const initialState : MyProjectsState = {
   projects: [],
   logs : [],
   complitedWeeks : 0,
   sortOptions: [
      {
         text: 'By name ascending',
         id: 'nameAsc',
         selected: true,
      },
      {
         text: 'By name descending',
         id: 'nameDesc',
         selected: false,
      },
      {
         text: 'By type ascending',
         id: 'typeAsc',
         selected: false,
      },
      {
         text: 'By type descending',
         id: 'typeDesc',
         selected: false,
      }
   ]
}

export default (state = initialState, acton: MyProjectsActions | UserActions) : MyProjectsState => {
   switch(acton.type) {
      case MY_PROJECTS_ACTION_TYPES.ADD_PROJECT:
         return {
            ...state,
            projects: [...state.projects, acton.project]
         }
      case MY_PROJECTS_ACTION_TYPES.SET_PROJECTS:
         return {
            ...state,
            projects: [...acton.projects],
         }
      case USER_ACTION_TYPES.SIGN_OUT:
         return {
            ...initialState
         }
      case MY_PROJECTS_ACTION_TYPES.REMOVE_PROJECT:
         const id = acton.projectId;
         return {
            ...state,

            projects: state.projects.filter(x => x.id !== id)
         }
      case MY_PROJECTS_ACTION_TYPES.CONVERT_TO_SHARED:
         const projectShared = acton.sharedProject;
         return {
            ...state,
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
            ...state,
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
            ...state,
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
      case MY_PROJECTS_ACTION_TYPES.DELETE_CONTRIBUTOR:
         return {
            ...state,
            projects: state.projects.map(x => {
               if(x.id === acton.projectId){
                  const newContributors = x.contributors.filter(x => x.id !== acton.contributorId);
                  return {
                     ...x,
                     contributors: newContributors
                  }
               }
               return x;
            })
         }
      case MY_PROJECTS_ACTION_TYPES.UPDATE_CONTRIBUTOR:
         return {
            ...state,
            projects: state.projects.map(x => {
               if(x.id === acton.projectId){
                  return {
                     ...x,
                     contributors: x.contributors.map(contributor => {
                        if(contributor.id === acton.contributorId){
                           return {
                              ...contributor,
                              allowDetails: acton.allowDetails,
                              allowMessage: acton.allowMessages
                           }
                        }
                        return contributor;
                     })
                  }
               }
               return x;
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
            }),
            logs : [...state.logs, {date: new Date(), time: timeToAdd, projectId: acton.projectId}]
         }
      case MY_PROJECTS_ACTION_TYPES.ADD_LOGS:
         const logs = acton.logs.filter(x => x.date.getMonth() === new Date().getMonth())
         return {
            ...state,
            logs: [...logs]
         }
      case MY_PROJECTS_ACTION_TYPES.EDIT_PROJECT:
         return {
            ...state,
            projects: state.projects.map(x => {
               if(x.id === acton.payload.projectId){
                  return {
                     ...x,
                     ...acton.payload.newData
                  }
               }
               return x;
            })
         }
      case MY_PROJECTS_ACTION_TYPES.ADD_TASK:
         return {
            ...state,
            projects: state.projects.map(x => {
               if(x.id === acton.projectId){
                  return {
                     ...x,
                     tasks: [...x.tasks, acton.task]
                  }
               }
               return x
            })
         }
      case MY_PROJECTS_ACTION_TYPES.DELETE_TASK:
         return {
            ...state,
            projects: state.projects.map(x => {
               if(x.id === acton.projectId){
                  return {
                     ...x,
                     tasks: x.tasks.filter(task => task.id !== acton.task.id)
                  }
               }
               return x
            })
         }
      case MY_PROJECTS_ACTION_TYPES.UPDATE_TASK:
         return {
            ...state,
            projects: state.projects.map(x => {
               if(x.id === acton.projectId){
                  return {
                     ...x,
                     tasks: x.tasks.map(task => {
                        if(task.id === acton.taskId){
                           return {
                              ...task,
                              done: acton.done,
                              text: acton.text
                           }
                        }
                        return task
                     })
                  }
               }
               return x
            })
         }
      case MY_PROJECTS_ACTION_TYPES.FETCH_COMPLITED_WEEKS:
         return {
            ...state,
            complitedWeeks: acton.weeksNumber
         }
      case MY_PROJECTS_ACTION_TYPES.SORT_PROJECTS:
         const sortId = state.sortOptions.find(x => x.selected)?.id;
         const sortedData = sortByKey(sortId, state.projects);
         return {
            ...state,
            projects : [...sortedData]
         }
      case MY_PROJECTS_ACTION_TYPES.CHANGE_SORTID:
         return {
            ...state,
            sortOptions : state.sortOptions.map(x => ({
               ...x,
               selected: acton.sortId === x.id
            }))
         }
   }
   return state;
} 

const sortByKey = (key : sortID | undefined, data: MyProject[]) => {
   switch (key) {
      case "nameAsc" :
         data.sort((a, b) => {
            return a.name.localeCompare(b.name);
         })
      break;
      case "nameDesc" :
         data.sort((a, b) => {
            return a.name.localeCompare(b.name) * -1;
         })
      break;
      case "typeAsc" :
         data.sort((a, b) => {
            return a.icon.localeCompare(b.icon);
         })
      break;
      case "typeDesc" :
         data.sort((a, b) => {
            return a.icon.localeCompare(b.icon) * -1;
         })
      break;
   }
   return data;
}
