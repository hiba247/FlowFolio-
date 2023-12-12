import React, { useState, useEffect } from "react";
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
import { names } from 'tinycolor2';
import axios from 'axios';

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
        fontSize: 11.5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width:150,
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
        height: 55,
      },
}));

function AddUserBox({name,domaine}) {
    const classes = useStyles();
    const [isBoxVisible, setIsBoxVisible] = React.useState(true);

  const handleDeleteClick = () => {
    setIsBoxVisible(false);
  };
    return(
        <div>
        {isBoxVisible && (<Box sx={{p: 1, border: '1.5px solid #3A85F4',marginBottom:16,borderRadius:"13px",
             overflow:"hidden",width:450}} className={classes.boxUser}>
        <Typography className={classes.textLabel}>{name}</Typography>
        <Typography className={classes.textLabel}>{domaine}</Typography>
        <DeleteRoundedIcon sx={{color: 'red', fontSize: 27,cursor: 'pointer'}}
          onClick={handleDeleteClick}/>
      </Box>
        )}
        </div>
    );
};

function StepTwo() {
  const classes = useStyles();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend API
    const token = localStorage.getItem("id_token");

    axios
      .get('http://127.0.0.1:8000/api/Users', {
        headers: {
          Authorization: `Token ${token}`, // Use Token format
        },
      })
      .then((response) => {
        console.log(response);
        setUserList(response.data);
        // Handle the response here
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors here
      });
      }, []);
  
  return (
    <Stack className={classes.mainStack} direction="column">
    <Stack spacing={4} direction="row" className={classes.stackSearch}>
      <Paper
       component="form"
        className={classes.paperSearch} 
        sx={{borderRadius: '20px'}}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Recherchez des personnes"
        inputProps={{ 'aria-label': 'Recherche' ,className: classes.searchInput,}}
        value=''
        onChange=''
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      </Paper>

      <Button
            variant="contained"
            className={classes.addButton}
            color="primary"
            startIcon={<Add />}
          >
            Ajouter
          </Button>
      </Stack>
      {userList.map((user, index) => (
        <AddUserBox key={user.user_id} name={user.username} domaine={user.disipline} />
      ))}
      </Stack>
    
  );
}

export default StepTwo;
