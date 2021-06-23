export type validationResult = {
   state: boolean,
   error: string,
}
export type validationFunction = (text: string) => validationResult

export const validateEmail : validationFunction = (text: string) => {
   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const state = re.test(String(text).toLowerCase());
   let errorText = "";
   if(!state){
      errorText = "Invalid Email"
   }
   return {
      state: state,
      error: errorText
   }
}
export const validatePassword : validationFunction  = (text: string) => {
   const state = text.length >= 6;
   let errorText = "";
   if(!state){
      errorText = "Invalid Password"
   }
   return {
      state: state,
      error: errorText
   }
}
export const validateProjectName : validationFunction  = (text: string) => {
   const state = text.length >= 1;
   let errorText = "";
   if(!state){
      errorText = "Invalid Project Name"
   }
   return {
      state: state,
      error: errorText
   }
}
export const validateWeeklyLimit : validationFunction  = (text: string) => {
   const number = parseInt(text)
   const state = number ? number > 0 : false;
   let errorText = "";
   if(!state){
      errorText = "Invalid Weekly Limit"
   }
   return {
      state: state,
      error: errorText
   }
}
// export const validateDueDate : validationFunction  = (text: string) => {
//    const state = text.length >= 1;
//    let errorText = "";
//    if(!state){
//       errorText = "Invalid Due Date"
//    }
//    return {
//       state: state,
//       error: errorText
//    }
// }
export const validateTimeToAdd : validationFunction  = (text: string) => {
   const number = parseInt(text)
   const state = number ? number > 0 : false;
   let errorText = "";
   if(!state){
      errorText = "Invalid Time"
   }
   return {
      state: state,
      error: errorText
   }
}
export const validateTaskName : validationFunction  = (text: string) => {
   const state = text.length >= 1;
   let errorText = "";
   if(!state){
      errorText = "Invalid Task Name"
   }
   return {
      state: state,
      error: errorText
   }
}
export const createConfirmPasswordValidator = (password: string) : validationFunction  =>  {
   return (text: string) => {
      const state = text === password;
      let errorText = "";
      if(!state) {
         errorText = "Passwords are different"
      }
      return {
         state: state,
         error: errorText
      }
   }
}