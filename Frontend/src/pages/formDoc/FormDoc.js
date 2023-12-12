import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
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
import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';
import axios from 'axios';
import {Link as RouterLink } from "react-router-dom";
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

import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
stepper: {
  top: 0,
  marginLeft: theme.spacing(35),
},
labelStep:{
  fontFamily: "poppins Light",
  fontSize: "20px",
},
buttonCont:{
  backgroundColor: "#3A85F4",
  borderRadius: "30px",
  textTransform: "capitalize",
  fontFamily: "Poppins",
},
buttonRet:{
  borderRadius: "30px",
  textTransform: "capitalize",
  fontFamily: "Poppins",
  color: "#A1A1A1",
},
buttonGroup:{
  marginLeft: theme.spacing(35),
},
mainStack:{
  display: "flex",
  flexDirection:"column",
  alignItems:"center",
},
circle:{
  color: "#3A85F4",
},
activeStep:{
  color: "#3A85F4",
},
buttonRetDoc:{
 padding: "7px",
 fontSize: 15,
},
stackValid:{
 marginLeft: theme.spacing(35),
},
validMsg:{
  fontFamily:'poppins',
},

}));
function styleSteps( str) {
  return <div style={{fontFamily:"poppins Light" }}>{str}</div>;
}


function FormDoc() {
  const { id } = useParams(); // Access the project code from the route parameter
  console.log(id);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const steps = [{label:'Informations sur le document'}, {label:'Ajoutez des commentateurs'},
   {label:'Insérez le document'}];
  const classe1 = useStyles();



  const [formData, setFormData] = React.useState({
    prjtid:'',
    stepOneData: {
      Code: '',
      Titre: '',
      Type: '',
      Revision: '',
      Statut: '',
    },
    stepTwoData:{
      Commentateurs:[],
    },
    stepThreeData:{
      FileName:'',
    }
    
  });
  
  console.log(formData);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);

    const token = localStorage.getItem("id_token");
    formData.prjtid=id
    console.log(formData)
    console.log(formData.FILES)
    axios
      .post('http://127.0.0.1:8000/api/addDocument', formData, {
        headers: {
          Authorization: `Token ${token}`, // Use Token format
        },
      })
      .then((response) => {
        console.log(response);
        // Handle the response here
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors here
      });
  };

  return (
    <Stack sx={{marginTop: 0}}className={classe1.mainStack} spacing={2} direction="row" alignItems="center">
     

       <Box className={classe1.mainStack}>
      <Stepper activeStep={activeStep} orientation="vertical" className={classe1.stepper}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel 
            
            StepIconProps={{
                sx:{

                }
              }} >
              <div className={classe1.labelStep}>{step.label}</div>
            </StepLabel>
            <StepContent>
            <div> {index === 0 ? ( <StepOne 
            formData={formData.stepOneData} setFormData={(data) => setFormData({ ...formData, stepOneData: data })}
            />): index ===1?(<StepTwo
              
            />) :(<StepThree
              formData={formData.stepThreeData} setFormData={(data) => setFormData({ ...formData, stepThreeData: data })}
            /> )}</div>
              <Box sx={{ mb: 0 }}>
                <Stack direction="row" spacing={1.5} className={classe1.buttonGroup}>
                <div> {index === 2 ? ( 
                  <Button
                  variant="contained"
                   color = "primary"
                   className={classe1.buttonCont}
                   onClick={(e) => {
                    handleNext(e);
                    handleSubmit(e);
                  }}                     >
                       Valider
                 </Button>
                ): (
                  <Button
                  variant="contained"
                   color = "primary"
                   className={classe1.buttonCont}
                   onClick={handleNext}
                     >
                       Continuer
                 </Button>
                )}</div>
                  <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        className={classe1.buttonRet}
                     >
                       Retour
                  </Button>
                  <div>{index===2 ? (<Button
                        onClick={handleReset}
                        className={classe1.buttonRet}
                     >
                       Reinitialiser
                  </Button>): null}</div>
                </Stack>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Stack sx={{width:"300px",marginTop:"50px",}} className={classe1.stackValid} direction="column" spacing={4} >
        <Paper square elevation={0} sx={{ p: 3,borderRadius: '30px',margin:15}}>
          <Typography className={classe1.validMsg} >Document ajouté avec succés</Typography>
        </Paper>
        <Button
        variant="contained"
         color = "primary"
         className={`${classe1.buttonCont} ${classe1.buttonRetDoc}`}
         to={`/app/project/${id}`}
                  component={RouterLink}
           >
             Retourner vers Documents
       </Button>
       </Stack>

      )}
    </Box>
      </Stack>
  );
}

export default FormDoc;
