export const mainBlack = "#141418";
export const mainWhite = "#E8E8E8";
export const black = 'black';
export const white = 'white';
export const green = "#43AA8B";
export const red = "#F94144"

export const getColors = (darkMode: boolean) => {
   if(darkMode){
      return {
         titleColor: {color: white},
         textColor: {color: white},
         background: {backgroundColor: mainBlack},
         border: {
            borderColor: black,
            borderWidth: 7,
         },
         borderBottom: {
            borderBottomColor: black,
            borderBottomWidth: 3,
         }
      }
   } else {
      return {
         titleColor: {color: white},
         textColor: {color: black},
         background: {backgroundColor: mainWhite},
         border: {
            borderColor: white,
            borderWidth: 7,
         },
         borderBottom: {
            borderBottomColor: white,
            borderBottomWidth: 3,
         }
      }
   }

}