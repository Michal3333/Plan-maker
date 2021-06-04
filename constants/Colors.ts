export const mainBlack = "#141418";
export const mainWhite = "#E8E8E8";
export const black = 'black';
export const white = 'white';
export const green = "#43AA8B";
export const red = "#F94144"
export const disabled = "gray"
export const primary = "#00A6A6"

export const green_1 = '#B0F3DF'
export const green_2 = '#6DCDB0'
export const green_3 = '#43AA8B'
export const green_4 = '#008960'

export const theme_red = '#F94144'
export const theme_green = '#2A9D8F'
export const theme_yellow = '#F9C74F'
export const theme_blue = '#277DA1'
export const theme_orange = '#F3722C'









const getThemeColors = (darkMode: boolean) => {
   let textColor = black;
   let titleColor = white;
   let backgroundColor = mainWhite;
   let borderColor = white
   let backgroundColorBig = white
   
   if(darkMode){
      textColor = white;
      titleColor = white;
      backgroundColor = mainBlack;
      borderColor = black;
      backgroundColorBig = black
      
   } 
   return {
      textColor,
      titleColor,
      backgroundColor,
      borderColor,
      backgroundColorBig
   }
}

export const getColors = (darkMode: boolean) => {
   const {backgroundColor, borderColor, textColor, titleColor, backgroundColorBig} = getThemeColors(darkMode);
   let shadow = {}
   if(darkMode) {
      shadow = {
         textShadowColor: 'black',
         textShadowRadius: 3
      }
   }
   return {
      backgroundColorMain: {
         backgroundColor: backgroundColorBig
      },
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
      textStyle: {
         fontFamily: 'open-sans',
         fontSize: 15,
      },
      titleHeaderStyle: {
         fontFamily: 'source-sans-pro-bold',
         fontSize: 70,
         ...shadow
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
      },
      cardStyle: {
         width: "100%",
         maxWidth: 400,
      }
   }

}

export const getColorsForNavigator = (darkMode: boolean) => {
   const {backgroundColor, borderColor, textColor, titleColor,backgroundColorBig} = getThemeColors(darkMode);
   return {
      iconColor : textColor,
      backgroundLighter: backgroundColor,
      backgroundDarker: backgroundColorBig
   }
}