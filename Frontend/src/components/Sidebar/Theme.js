import { createTheme } from "@material-ui/core/styles";

const Theme = createTheme({
  overrides: {
    MuiDrawer: {
      
        backgroundColor: "#00000", // Replace with your desired background color
    
    },
  },
  palette: {
    primary: {
      main: "#000000", // Set your primary color
    },
    background: {
      default: "#000000", // Set the background color to black
    },
  },
});

export default Theme;
