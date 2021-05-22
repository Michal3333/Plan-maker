export const mainBlack = "#141418";
export const mainWhite = "#E8E8E8";
export const black = 'black';
export const white = 'white';
export const green = "#43AA8B";
export const red = "#F94144"
export const disabled = "gray"
export const primary = "#00A6A6"

const getThemeColors = (darkMode: boolean) => {
   let textColor = black;
   let titleColor = white;
   let backgroundColor = mainWhite;
   let borderColor = white
   if(darkMode){
      textColor = white;
      titleColor = white;
      backgroundColor = mainBlack;
      borderColor = black;
   } 
   return {
      textColor,
      titleColor,
      backgroundColor,
      borderColor
   }
}

export const getColors = (darkMode: boolean) => {
   const {backgroundColor, borderColor, textColor, titleColor} = getThemeColors(darkMode);
   return {
      buttonColor: {
         color: textColor
      },
      buttonColorDisabled: {
         color: disabled
      },
      buttonTextStyleConfirm: {
         fontFamily: 'open-sans-bold',
         fontSize: 20,
      },
      buttonTextStyle: {
         fontFamily: 'open-sans',
         fontSize: 15,
      },
      buttonStyle: {
         backgroundColor: borderColor,
         borderRadius: 40,
         padding: 7
      },
      titleColor: {color: titleColor},
      textColor: {color: textColor},
      inputStyle: {
         fontFamily: 'open-sans',
         fontSize: 16,
         height: 40,
      },
      labelStyle: {
         fontFamily: 'open-sans-bold',
         fontSize: 20,
      },
      titleHeaderStyle: {
         fontFamily: 'source-sans-pro-bold',
         fontSize: 70,
         textShadowColor: 'black',
         textShadowRadius: 3
      },
      background: {backgroundColor: backgroundColor},
      border: {
         borderColor: borderColor,
         borderWidth: 7,
      },
      borderBottom: {
         borderBottomColor: borderColor,
         borderBottomWidth: 3,
      },
      errorTextStyle: {
         fontFamily: 'open-sans',
         fontSize: 13,
         color: red,
         height: 20
      }
   }

}

export const getColorsForNavigator = (darkMode: boolean) => {
   const {backgroundColor, borderColor, textColor, titleColor} = getThemeColors(darkMode);
   return {
      iconColor : textColor
   }
}