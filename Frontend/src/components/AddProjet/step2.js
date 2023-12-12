import React from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Paper,
  InputBase,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import useAddProjetContext from '../../hooks/useAddProjetContext';

const useStyles = makeStyles((theme) => ({
  stackSearch:{
      display: 'flex',
      justifyContent: 'space-round',
      margin: theme.spacing(4),
      marginLeft: theme.spacing(20),
    },
    paperSearch:{
      p: '2px 4px', display: 'flex',borderRadius: "30px", width: 300, height: 40,
    },
    addButton: {
      marginLeft: theme.spacing(2),
      backgroundColor: "#3A85F4",
      color: "white",
      borderRadius: "30px",
      textTransform: "capitalize",
      fontFamily: "Poppins",
      height: 36,
    },
    searchInput: {
      fontFamily: 'Poppins',
      textIndent: 10,
      caretColor: '#D3D3D3',
      '&::placeholder': {
      fontSize: 15,
      fontFamily: 'Poppins',
      textIndent: 10,
      },
    },
    stackUser:{
      display: 'flex',
      borderColor: '#3A85F4',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textLabel:{
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      fontSize: 13,
    },
    mainStack:{
      display: 'flex',
      alignItems: 'center',
    },
    boxUser:{
      display: 'flex',
      marginLeft: theme.spacing(17),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
}));
function CustomizedInputBase({ placeholder, value, onChange }) {
  const classes = useStyles();

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        borderRadius: '11px',
        alignItems: 'center',
        width: '100%',
        height: '45px',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputProps={{ 'aria-label': 'Recherche', className: classes.textInput }}
      />
    </Paper>
  );
}

function CodificationStep() {
  const {
    handleChampChange,
    nouveauChamp,
    handleAdd,
    formValues,
    handleChampDelete
  }=useAddProjetContext()
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomizedInputBase
            placeholder="Titre de Champ"
            value={nouveauChamp.titre}
            onChange={(e) => handleChampChange('titre', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomizedInputBase
            placeholder="Nombre de Caractères"
            type="number"
            value={nouveauChamp.nbCaracteres}
            onChange={(e) => handleChampChange('nbCaracteres', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Type de Champ</InputLabel>
            <Select
              name="typeChamp"
              value={nouveauChamp.typeChamp}
              onChange={(e) => handleChampChange('typeChamp', e.target.value)}
            >
              <MenuItem value="numerique">Numérique</MenuItem>
              <MenuItem value="alphanumerique">Alphanumérique</MenuItem>
              <MenuItem value="alphabetique">Alphabétique</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            startIcon={<AddIcon />}
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
      {formValues.champsCodification.map((champ, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12}>
            <CustomizedInputBase
              placeholder="Titre de Champ"
              value={champ.titre}
              onChange={(e) => handleChampChange(index, 'titre', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomizedInputBase
              placeholder="Nombre de Caractères"
              type="number"
              value={champ.nbCaracteres}
              onChange={(e) => handleChampChange(index, 'nbCaracteres', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Type de Champ</InputLabel>
              <Select
                name="typeChamp"
                value={champ.typeChamp}
                onChange={(e) => handleChampChange(index, 'typeChamp', e.target.value)}
              >
                <MenuItem value="numerique">Numérique</MenuItem>
                <MenuItem value="alphanumerique">Alphanumérique</MenuItem>
                <MenuItem value="alphabetique">Alphabétique</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <IconButton
              onClick={() => handleChampDelete(index)}
              aria-label="Supprimer"
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </div>
  );
}

export default CodificationStep;
