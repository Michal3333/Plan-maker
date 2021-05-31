export const validateEmail = (text: string) => {
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
export const validatePassword = (text: string) => {
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
export const validateProjectName = (text: string) => {
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
export const validateWeeklyLimit = (text: string) => {
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
export const validateDueDate = (text: string) => {
   const state = text.length >= 1;
   let errorText = "";
   if(!state){
      errorText = "Invalid Due Date"
   }
   return {
      state: state,
      error: errorText
   }
}
export const validateTimeToAdd = (text: string) => {
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
export const createConfirmPasswordValidator = (password: string) => {
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