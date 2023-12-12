import React from 'react';
import { 
  makeStyles,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import useAddProjetContext from '../../hooks/useAddProjetContext';

const useStyles = makeStyles((theme) => ({
  gridBottom: {
    display: 'flex',
    justifyContent: 'center',
  },
  
  textInput: {
    fontFamily: 'Poppins',
    caretColor: '#D3D3D3',
    textindent: 10,
    '&::placeholder': {
    fontSize: 15,
    fontFamily: 'Poppins',
    textindent: 10,
    fontStyle: 'italic',
    color:'#3A85F4',
    },  },
  
    stackInput:{
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(4),
      marginLeft: theme.spacing(20),
    },
    textLabel:{
      fontFamily: 'Poppins',
      color: '#3A85F4',
      fontStyle: 'italic',
      fontSize: 15,
    },
    Select:{
      boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },
      
    },
    selectLabel:{
      fontFamily: 'Poppins',
      fontSize: 15,
      color: '#000000',
      textIndent: 10,
    },
    selectLabelWithVal:{
      fontFamily: 'Poppins',
      fontStyle: 'italic',
      fontSize: 15,
      color: '#b7b7b7',
      textIndent: 10,
    },
  
  
  }));
  
  function CustomizedInputBase({ placeholder, width, name, value, onChange }) {
    const classes = useStyles();
    const {
      formValues,
      handleChange,
    }=useAddProjetContext()
  
    return (
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          borderRadius: '11px',
          alignItems: 'center',
          width: width,
          height: '45px',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange} //// Bind to handleInputChange
          inputProps={{ 'aria-label': 'Recherche', className: classes.textInput }}
        />
      </Paper>
    );
  }
  
function InformationsStep() {
  const {
    formValues,
    handleChange,
  }=useAddProjetContext()

  const classe1 = useStyles();


  return (
    <Stack spacing={2} direction="row" className={classe1.stackInput}>
    <Stack spacing={5} direction="column">  
     <Typography className={classe1.textLabel} variant="label">Nom :</Typography>
     <Typography className={classe1.textLabel} variant="label">Code :</Typography>
    </Stack>

    <Stack spacing={2} direction="column" >

   
 <CustomizedInputBase
  placeholder="Nom"
  name="nom"
  width="300px"
  label="Nom :"
  value={formValues.nom}
  onChange={(e) => handleChange(e)} //  fullWidth
/>

<CustomizedInputBase
  placeholder="Code"
  width="300px"
  label="Code :"
  name="codeProjet"
  value={formValues.codeProjet}
  onChange={(e) => handleChange(e)}
  fullWidth
/>

</Stack>
</Stack>


  );
}

export default InformationsStep;
