import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
// styles
import useStyles from "./styles";
import { BarChart, Bar, CartesianGrid, Tooltip, Legend } from 'recharts';
// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import Paper from '@mui/material/Paper';
import { Divider } from "@mui/material";
import axios from "axios";



const data1 = [
  { name: 'Jan', bejaia: 10, cap_djenet: 15, fouka: 5 },
  { name: 'Fev', bejaia: 20, cap_djenet: 10, fouka: 25 },
  { name: 'Mars', bejaia: 15, cap_djenet: 30, fouka: 10 },
  { name: 'Avril', bejaia: 30, cap_djenet: 5, fouka: 20 },
  { name: 'Mai', bejaia: 20, cap_djenet: 10, fouka: 15 },
  { name: 'Juin', bejaia: 15, cap_djenet: 30, fouka: 10 },
  { name: 'Jul', bejaia: 30, cap_djenet: 5, fouka: 20 },
  { name: 'Aug', bejaia: 20, cap_djenet: 10, fouka: 15 },
  { name: 'Sep', bejaia: 15, cap_djenet: 30, fouka: 10 },
  { name: 'Oct', bejaia: 30, cap_djenet: 5, fouka: 20 },
  { name: 'Nov', bejaia: 20, cap_djenet: 10, fouka: 15 },
  { name: 'Dec', bejaia: 15, cap_djenet: 30, fouka: 10 },
];
const data2 = [
  { name: 'bejaia', Nombre_de_documents: 10 },
  { name: 'Cap Djinet', Nombre_de_documents: 20 },
  { name: 'Fouka', Nombre_de_documents: 15 },
  { name: 'Cap Blanc', Nombre_de_documents: 30 },
];

const data3 = [
  { name: 'Category A', value: 10 },
  { name: 'Category B', value: 20 },
  { name: 'Category C', value: 15 },
  { name: 'Category D', value: 30 },
];

const data4 = [
  { name: 'Category A', value: 10 },
  { name: 'Category B', value: 20 },
  { name: 'Category C', value: 15 },
  { name: 'Category D', value: 30 },
];

function DocParMois(){
  var classes = useStyles();
  return(
    <Stack alignItems="center">
      <h2>Documents par mois</h2>
  <ResponsiveContainer width="100%" height={400}>
  <BarChart data={data1} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="bejaia" stackId="a" fill="#3A85F4" />
    <Bar dataKey="cap_djenet" stackId="a" fill="#82ca9d" />
    <Bar dataKey="fouka" stackId="a" fill="#ffc658" />
  </BarChart>
</ResponsiveContainer>
</Stack>
);
}

function DocParProjet(){
  const [projectData, setProjectData] = useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/docPerProject") 
      .then((response) => {
        setProjectData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching project data: ", error);
      });
  }, []);

  return (
    <Stack alignItems="center">
      <h2>Documents par projet</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={projectData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Nombre_de_documents" fill="#3A85F4" />
        </BarChart>
      </ResponsiveContainer>
    </Stack>
  );
}


function DocParStatut(){
  var classes = useStyles();
  const [RevData, setRevData] = useState([]);
  useEffect(() => {  axios
  .get('http://127.0.0.1:8000/api/docPerStatus', )
  .then((response) => {
    console.log(response);
    setRevData(response.data);
    // Handle the response here
    console.log(RevData);
  })
  .catch((error) => {
    console.error(error);
    // Handle any errors here
  })
}, []);
  return(
    <Stack alignItems="center">
      <h2>Documents par Statut</h2>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={RevData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="nombre_de_documents" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </Stack>
  );
}


function DocParRev(){
  var classes = useStyles();
  const [RevData, setRevData] = useState([]);
  useEffect(() => {  axios
  .get('http://127.0.0.1:8000/api/docPerRevision', )
  .then((response) => {
    console.log(response);
    setRevData(response.data);
    // Handle the response here
    console.log(RevData);
  })
  .catch((error) => {
    console.error(error);
    // Handle any errors here
  })
}, []);

  return(
    <Stack alignItems="center">
      <h2>Documents par revision</h2>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={RevData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="nombre_de_documents" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </Stack>
  );
}


export default function Dashboard(props) {
  var theme = useTheme();

  
  return (
    <Stack direction="column" spacing={theme.spacing(0.5)} >
      <DocParMois/><DocParProjet/><DocParStatut/>
      <DocParRev/>
      
    </Stack>
  );
}

