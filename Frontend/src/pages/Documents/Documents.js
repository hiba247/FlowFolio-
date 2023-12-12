import React, { useState, useEffect } from "react";
import { Button, Grid ,Popover, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"; // Import the arrow icon
import { FilterList } from "@material-ui/icons";
import { Add } from "@material-ui/icons";
import { HashRouter, Route, Link as RouterLink, Link } from "react-router-dom";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";
import Stack from '@mui/material/Stack';
// data
import mock from "../dashboard/mock";
import axios from 'axios';


  function ActionsDropdown({ rowData, handleDelete, handleEdit, handleComments, Code }) {
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
            <button className={classes.popButton} 
            component={RouterLink}
            to="/app/History"
            >Historique</button>
          </Stack>
        </Popover>
      </div>
    );
  }
  
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
      justifyContent: 'flex-end',
    },
    popButton:{
      backgroundColor :"transparent",
      border: "none",
      fontFamily: "Poppins",
      fontSize: "14px",
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


  }))
 

 function StyleData(value){return <div style={{ fontFamily: "poppins", }} >{value}</div>;}

  const columns = [
    // ... (other columns)
    {name: "titre",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey'}}>Titre</div>,
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
    name: "code",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey'}}>Code</div>,
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
    name: "revision_actuelle",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey'}}>Révision Actuelle</div>,
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
    name: "type",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey'}}>Type</div>,
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
    name: "statut",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey'}}>Statut</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
     
  ];
  
  
  
  const options = {
    download: false, // Remove download option
    print: false, // Remove print option
    selectableRows: "none", // Remove checkbox selection
    filter: true,
    search: true, // Enable global search
    rowsPerPage: [5],
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
  
  function handleAddRevision(rowData) {
    // Implement add revision action here using the rowData
    console.log("Add Revision clicked for row: ", rowData);
  }
  
  export default function Documents() {
    const [filteredDocs, setFilteredDocs] = useState(
      []
     );
    useEffect(() => {
    
      const token = localStorage.getItem("id_token");
  
      axios
        .get('http://127.0.0.1:8000/api/document', {
          headers: {
            Authorization: `Token ${token}`, // Use Token format
          },
        })
        .then((response) => {
          console.log(response);
          setFilteredDocs({ data: response.data });
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
      startIcon={<FilterList />}
      className={classes.button}
      component={RouterLink}
      to="/app/History"
    >
      Filtrer
    </Button>

    </Stack>

       <Grid container spacing={4}>
          <Grid item xs={12} >
            <MUIDataTable
              title=<div style={{ fontFamily: "poppins", fontSize: 30, fontWeight:"bold" }}>Documents</div>
              data={filteredDocs.data}
              columns={columns}
              options={options}
              className={classes.dataTable}
            />
          </Grid>
        </Grid>
        
    </>
    );
  }
