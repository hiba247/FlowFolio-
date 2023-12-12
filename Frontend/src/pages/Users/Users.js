import React, { useState,useEffect } from "react";
import { Button, Grid, Popover, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Add } from "@material-ui/icons";
import { HashRouter, Route, Link as RouterLink } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  dataTable: {
    overflow: 'auto',
    borderRadius: '20px',
  },
  button: {
    backgroundColor: "#3A85F4",
    borderRadius: "30px",
    textTransform: "capitalize",
    fontFamily: "Poppins",
  },
  stackButtons: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  popButton: {
    backgroundColor: "transparent",
    border: "none",
    fontFamily: "Poppins",
    cursor: "pointer",
    "&:hover": {
      color: "#3A85F4",
    },
  },
  stackPopMenu: {
    padding: theme.spacing(1.5),
  },
  popover: {
    borderRadius: "20px",
    "& .MuiPopover-paper": {
      borderRadius: "20px",
    },
  },
}));

const options = {
  download: false,
  print: false,
  selectableRows: "none",
  filter: true,
  search: true,
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

function StyleData(value) {
  return <div style={{ fontFamily: "poppins" }}>{value}</div>;
}

const columns = [
  {
    name: "username",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey' }}>nom d'Utilisateur</div>,
    options: {
      filter: true,
      sort: true,
      search: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  {
    name: "email",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey' }}>email</div>,
    options: {
      filter: true,
      sort: true,
      search: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  {
    name: "role",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey' }}>Role</div>,
    options: {
      filter: true,
      sort: true,
      search: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  {
    name: "disipline",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey' }}>Discipline</div>,
    options: {
      filter: true,
      sort: true,
      search: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },

  {
    name: "Actions",
    label: <div style={{ fontFamily: "poppins", fontSize: 19, color: 'grey' }}>Actions</div>,
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
          <button className={classes.popButton} onClick={() => handleDelete(rowData)}>Supprimer</button>
        </Stack>
      </Popover>
    </div>
  );
}

function handleDelete(rowData) {
  console.log("Delete clicked for row: ", rowData);
}

function handleEdit(rowData) {
  console.log("Edit clicked for row: ", rowData);
}

function handleHistory(rowData) {
  console.log("History clicked for row: ", rowData);
}

function handleComments(rowData) {
  console.log("Comments clicked for row: ", rowData);
}

function Users() {
  const classes = useStyles();
  const link = "/app/add-document";

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
        setUserList({ data: response.data });
        // Handle the response here
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors here
      });
      }, []);

  return (
    <>
      <Stack spacing={2} direction="row" className={classes.stackButtons}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          className={classes.button}
          component={RouterLink}
          to={link}
        >
          Ajouter
        </Button>
      </Stack>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={<div style={{ fontFamily: "poppins", fontSize: 30, fontWeight: "bold" }}>Utilisateurs</div>}
            columns={columns}
            data={userList.data} // Step 5: Use user data in the MUIDataTable
            options={options}
            className={classes.dataTable}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Users;
