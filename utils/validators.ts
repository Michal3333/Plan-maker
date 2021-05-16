export const validateEmail = (text: string) => {
   const state = text.includes('@');
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