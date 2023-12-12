import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
  Paper,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { DoubleArrow, Search as SearchIcon } from "@material-ui/icons";
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { Add } from "@material-ui/icons";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    backgroundColor: "#3A85F4",
    color: "white",
    borderRadius: 31,
    marginBottom: theme.spacing(2),
    marginInlineStart: 4,
    marginInline: 4,
  },
  cardContent: {
    fontSize: 16,
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
  nameText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 20,
    opacity: 0.95,
    whiteSpace: "nowrap",
  },
  codeText:{
    fontFamily: "Poppins",
    fontSize: 18,
    whiteSpace: "nowrap",
  },
  linkIcon: {
    fontSize: 50,
    overflow: "auto",
    //marginLeft: theme.spacing(17),
  },
  RouterLink: {
    },
  Stack:{
    display: 'flex',
    justifyContent: 'space-around',
  },
  stackSearch:{
    display: 'flex',
    marginBottom: theme.spacing(6),
    justifyContent: 'space-between',
  },
  paperSearch:{
    p: '2px 4px', display: 'flex',borderRadius: 30, width: 350, height: 40,
  },
 searchInput: {
    width: "100%",
    borderRadius: 30, // Rounded border
  },
}
));

export default function Projets() {
  const classes = useStyles();
  const [numColumns, setNumColumns] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(
   []
  );

  useEffect(() => {
    
    const token = localStorage.getItem("id_token");

    axios
      .get('http://127.0.0.1:8000/api/projet', {
        headers: {
          Authorization: `Token ${token}`, // Use Token format
        },
      })
      .then((response) => {
        console.log(response);
        setFilteredProjects(response.data);
        // Handle the response here
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors here
      });

    const updateNumColumns = () => {
      const container = document.querySelector(".container");
      if (container) {
        const containerWidth = container.offsetWidth;
        const cardWidth = 340;
        const minSpace = 2;
        const columns = Math.floor(
          (containerWidth - minSpace) / (cardWidth + minSpace)
        );
        setNumColumns(columns > 0 ? columns : 1);
      }
    };

    window.addEventListener("resize", updateNumColumns);
    updateNumColumns();

    return () => {
      window.removeEventListener("resize", updateNumColumns);
    };
  }, []);

  useEffect(() => {
    const filtered = filteredProjects.filter(
      (project) =>
        project.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <PageTitle title="Projets" />
      <Stack spacing={4} direction="row" className={classes.stackSearch}>
      <Paper
       component="form"
        className={classes.paperSearch} >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Recherchez par code ou par titre"
        inputProps={{ 'aria-label': 'Recherche' ,className: classes.searchInput,}}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      </Paper>

      <Button
            variant="contained"
            className={classes.addButton}
            component={RouterLink}
            color="primary"
            startIcon={<Add />}
            to="/app/AddProjet"   >
       
            Ajouter un projet
          </Button>
      </Stack>


      <Grid container spacing={2}>
        
        
        {filteredProjects.map((project, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={Math.floor(12 / numColumns)}
            key={index}
          >
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Stack spacing={0} direction="row" className={classes.Stack}>
                  <div>
                  <Typography className={classes.nameText} variant="body1">{project.nom}</Typography>
                  <Typography className={classes.codeText} variant="body1">{project.code}</Typography>
                  </div>
                  <RouterLink
                    to={`/app/project/${project.id}`}
                    className={classes.RouterLink}
                  >
                    <DoubleArrow className={classes.linkIcon}/>
                  </RouterLink>
                  </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
