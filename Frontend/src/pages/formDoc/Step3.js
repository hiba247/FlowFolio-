import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Add } from "@material-ui/icons";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {useDropzone} from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    makeStyles,
    Button,
    TextField,
    InputAdornment,
    Box,
  } from "@material-ui/core";

  const useStyles = makeStyles((theme) => ({
    mainBox:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      borderRadius:'20px',
      justifyContent:'center',
      margin: theme.spacing(3),
      marginLeft: theme.spacing(20),
      width: '400px',
      height: '200px',
    },
    dragText:{
      fontFamily:'Poppins',
    },
    addButton: {
      marginLeft: theme.spacing(2),
      backgroundColor: "#3A85F4",
      color: "white",
      borderRadius: "30px",
      textTransform: "capitalize",
      fontFamily: "Poppins",
      height: 36,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    dragBox:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      marginBottom: theme.spacing(2),
    },
    fileName:{
      width:375,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontFamily:'Poppins',
      textAlign: 'center',
    },

  }));

  function DragDropFile({onInputValueChange}) {
    const classes = useStyles();
    //file upload
    const [fileName, setFileName] = React.useState(null);
    const onDrop = (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        if (fileName === null) {
          setFileName(acceptedFiles[0].name);
          onInputValueChange(acceptedFiles[0].name); // Update the value when a file is dropped
        } else {
          setFileName(null);
          onInputValueChange(null); // Clear the value when the file is removed
        }
      }
      };
    const handleChange = (e) => {
      const newValue = e.target.value;
      
      onInputValueChange(newValue);
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

    
    return (
      <Box>
      {fileName === null?(<Box sx={{border:'2.25px dotted #3A85F4',}}  {...getRootProps()}
      className={classes.mainBox} >
      <input {...getInputProps()} />
        <div className={classes.dragBox}>
        <CloudUploadOutlinedIcon sx={{fontSize:'70px',color:'#3A85F4',}}/>
        <Typography className={classes.dragText} variant="body1">Glissez-Déposez le fichier ici</Typography>
        </div>
        <Typography className={classes.dragText} variant="body1">Ou</Typography>
        <Button
            variant="contained"
            className={classes.addButton}
            color="primary"
          >
            Parcourir
          </Button>
      </Box> ) :
       (<Box sx={{border:'2px solid #3A85F4',}} 
       className={classes.mainBox} >
         <div className={classes.dragBox}>
         <CloudDoneOutlinedIcon sx={{fontSize:'120px',color:'#3A85F4',}}/>
         <Typography className={classes.fileName} variant="body1">{fileName}</Typography>
         </div>
       </Box>)}
      </Box>
    );
  }


function StepThree({formData, setFormData}){
    return(
      <DragDropFile
      onInputValueChange={(newValue) => {
        
        setFormData({ ...formData, FileName: newValue });
      }}
      />
    );
};
export default StepThree;