import React, { useState } from 'react';
import {
  Button,
  Typography,
  Container,
  makeStyles,
  Box,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import InformationsStep from './step1';
import CodificationStep from './step2';

import useAddProjetContext from '../../hooks/useAddProjetContext';


function AddProjet() {
  const {
    steps,
    activeStep,
    formValues,
    setActiveStep,
    nouveauChamp,
    setFormValues
  }=useAddProjetContext()

 const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

   
  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 1) {
      // Handle step 2 logic here, if needed
    }
  };
  /*********************** */
  const handlesend = () => {
    console.log(formValues); // Change FormData to formValues
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);

    const token = localStorage.getItem("id_token");

    axios
      .post('http://127.0.0.1:8000/api/addprojet', formValues, {
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
  
  const useStyles = makeStyles((theme) => ({
    stepper: {
      top: 0,
      marginLeft: theme.spacing(20),
    },
    labelStep: {
      fontFamily: "poppins Light",
      fontSize: "20px",
    },
    buttonCont: {
      backgroundColor: "#3A85F4",
      borderRadius: "30px",
      textTransform: "capitalize",
      fontFamily: "Poppins",
    },
    buttonRet: {
      borderRadius: "30px",
      textTransform: "capitalize",
      fontFamily: "Poppins",
      color: "#A1A1A1",
    },
    buttonGroup: {
      marginLeft: theme.spacing(20),
    },
    mainStack: {
      display: "flex",
    },
    circle: {
      color: "#3A85F4",
    },
    activeStep: {
      color: "#3A85F4",
    },
  }));
  
  const classe1 = useStyles();
  
  const handleReset = () => {
    setActiveStep(0);
  };
  
  return (
    <Stack sx={{ marginTop: 0 }} className={classe1.mainStack} spacing={2} direction="row" alignItems="center">
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical" className={classe1.stepper}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel StepIconProps={{}}>
                {step.label}
              </StepLabel>
              <StepContent>
                <div>
                  {index === 0 ? (
                    <InformationsStep  />
                  ) : (
                    <CodificationStep
               
                    />
                  )}
                </div>
                <Box sx={{ mb: 0 }}>
                  <Stack direction="row" spacing={1.5} className={classe1.buttonGroup}>
                    <div>
                      {index === 1 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          className={classe1.buttonCont}
                          onClick={(e)=>handleSubmit(e)}
                        >
                          Valider
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          className={classe1.buttonCont}
                          onClick={handleNext}
                        >
                          Continuer
                        </Button>
                      )}
                    </div>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      className={classe1.buttonRet}
                    >
                      Retour
                    </Button>
                    <div>
                      {index === 1 ? (
                        <Button
                          onClick={handleReset}
                          className={classe1.buttonRet}
                        >
                          Reinitialiser
                        </Button>
                      ) : null}
                    </div>
                  </Stack>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
  
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3, borderRadius: '13px', margin: 15 }}>
            <Typography >Projet ajouté avec succès</Typography>
          </Paper>
        )}
      </Box>
    </Stack>
  );
}

export default AddProjet;
