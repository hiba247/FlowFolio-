import React ,{useState,useEffect}from "react";
import { Button, Grid ,Popover, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"; // Import the arrow icon
import { FilterList } from "@material-ui/icons";
import { Add } from "@material-ui/icons";
import { HashRouter, Route, Link as RouterLink } from "react-router-dom";
import Stack from '@mui/material/Stack';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useParams } from "react-router-dom";
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    dataTable: {
      overflow: 'auto',
      borderRadius: '20px',
    },
    button:{
      backgroundColor: "#3A85F4",
      borderRadius: "30px",
      textTransform: "capitalize",
      fontFamily: "Poppins",
    },
    stackButtons:{
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      justifyContent: 'space-between',
    },
    popButton:{
      backgroundColor :"transparent",
      border: "none",
      fontFamily: "Poppins",
      cursor: "pointer",
      "&:hover": {
        color: "#3A85F4",
        },
    },
    stackPopMenu:{
      padding: theme.spacing(1.5),
    },
    popover:{
      borderRadius: "20px",
      "& .MuiPopover-paper":{
        borderRadius: "20px",
      },
    },
    buttonBack:{
        
    },


  }))


  const Revision=
{
  "data": [
    {
      "Code": "001",
      "Titre": "Item 1",
      "Révision": "1.0",
      "Statut": "Active"
    },
    {
      "Code": "002",
      "Titre": "Item 2",
      "Révision": "2.1",
      "Statut": "Inactive"
    },
    {
      "Code": "003",
      "Titre": "Item 3",
      "Révision": "1.5",
      "Statut": "Active"
    },
    {
      "Code": "004",
      "Titre": "Item 4",
      "Révision": "3.0",
      "Statut": "Active"
    },
    {
      "Code": "005",
      "Titre": "Item 5",
      "Révision": "1.2",
      "Statut": "Inactive"
    },
    {
      "Code": "006",
      "Titre": "Item 6",
      "Révision": "2.3",
      "Statut": "Active"
    },
    {
      "Code": "007",
      "Titre": "Item 7",
      "Révision": "1.1",
      
      "Statut": "Active"
    },
    {
      "Code": "008",
      "Titre": "Item 8",
      "Révision": "2.0",
      "Statut": "Inactive"
    },
    {
      "Code": "009",
      "Titre": "Item 9",
      "Révision": "1.8",
      "Statut": "Active"
    },
    {
      "Code": "010",
      "Titre": "Item 10",
      "Révision": "3.2",
      
      "Statut": "Active"
    },
    {
      "Code": "011",
      "Titre": "Item 11",
      "Révision": "1.9",
      "Statut": "Active"
    },
    {
      "Code": "012",
      "Titre": "Item 12",
      "Révision": "2.7",
      "Statut": "Inactive"
    },
    {
      "Code": "013",
      "Titre": "Item 13",
      "Révision": "1.4",
      
      "Statut": "Active"
    },
    {
      "Code": "014",
      "Titre": "Item 14",
      "Révision": "3.5",
      "Statut": "Active"
    },
    {
      "Code": "015",
      "Titre": "Item 15",
      "Révision": "1.3",
      "Statut": "Inactive"
    },
   
  ]}



const options = {
    download: false, // Remove download option
    print: false, // Remove print option
    selectableRows: "none", // Remove checkbox selection
    filter: true,
    search: true, // Enable global search
    rowsPerPage: [10],
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items per page",
        displayRows: "of",
      },
    },
    onChangePage(currentPage) {
      console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows) {
      console.log({ numberOfRows });
    },
  };



  function StyleData(value){return <div style={{ fontFamily: "poppins", }} >{value}</div>;}



  const columns = [
    // ... (other columns)
    {name: "id",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey'}}>Identificateur</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  {
    name: "numero_revision",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey'}}>Révision</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  {
    name: "user_name",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey'}}>Utilisateur</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  
 
     { name: "Actions",
      label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey'}}>Actions</div>,
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
          return (
            <ActionsDropdown
              rowData={rowData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleHistory={handleHistory}
              handleComments={handleComments}
            />
          );
        },
      },
    },
  ];



  function ActionsDropdown({ rowData, handleDelete, handleEdit, handleComments, handleAddRevision, Code }) {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const classes = useStyles();
    return (
      <div>
        <IconButton
          aria-label="Actions"
          onClick={handlePopoverOpen}
        >
          <ArrowDropDownIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          className={classes.popover}
        >
          <Stack direction="column" spacing={2} className={classes.stackPopMenu}>
          <button className={classes.popButton} >Lire</button>
            <button className={classes.popButton} onClick={() => handleDelete(rowData)}>Supprimer</button>
            <button className={classes.popButton} onClick={() => handleEdit(rowData)}>Modifier</button>
            <button className={classes.popButton} onClick={() => handleComments(rowData)}>Commenter</button>
            <button className={classes.popButton}>Telecharger</button>
          </Stack>
        </Popover>
      </div>
    );
  }

  function handleDelete(rowData) {
    // Implement delete action here using the rowData
    console.log("Delete clicked for row: ", rowData);
  }
  
  function handleEdit(rowData) {
    // Implement edit action here using the rowData
    console.log("Edit clicked for row: ", rowData);
  }
  
  function handleHistory(rowData) {
    // Implement history action here using the rowData
    console.log("History clicked for row: ", rowData);
  }
  
  function handleComments(rowData) {
    // Implement comments action here using the rowData
    console.log("Comments clicked for row: ", rowData);
  }
  
 
  

function HistoriqueDoc() {
  const { id } = useParams(); // Access the project code from the route parameter
  console.log(id);
  const [filteredRev, setFilteredRev] = useState(
    []
   );
  useEffect(() => {
  
    const token = localStorage.getItem("id_token");

    axios
      .get(`http://127.0.0.1:8000/api/revision/${id}`, {
        headers: {
          Authorization: `Token ${token}`, // Use Token format
        },
      })
      .then((response) => {
        console.log(response);
        setFilteredRev({ data: response.data });
        console.log(response.data);
        // Handle the response here
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors here
      });
    }, []);

    const classes = useStyles();
    const link = "/app/add-document";
    return (
      <>
        <Stack spacing={2} direction="row" className={classes.stackButtons}>
      <Button
      variant="contained"
      color = "primary"
      startIcon={<ArrowBackRoundedIcon />}
      className={`${classes.button} ${classes.buttonBack}`}
      component={RouterLink}
      to='/app/Documents'
    >
      Retourner vers documents
    </Button>
    <Button
      variant="contained"
      color = "primary"
      startIcon={<Add />}
      className={classes.button}
      component={RouterLink}
      to={link}
    >
      Ajouter
    </Button>
    </Stack>

       <Grid container spacing={4}>
          <Grid item xs={12} >
            <MUIDataTable
              title=<div style={{ fontFamily: "poppins", fontSize: 30, fontWeight:"bold" }}>Historique</div>
              data={filteredRev.data}
              columns={columns}
              options={options}
              className={classes.dataTable}
            />
          </Grid>
        </Grid>
        
    </>
    );
};
export default HistoriqueDoc;   