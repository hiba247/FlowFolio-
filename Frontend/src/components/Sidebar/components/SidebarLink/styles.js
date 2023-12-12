import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    marginBottom: theme.spacing(3),
    textDecoration: "none",
    "&:hover, &:focus": {
        backgroundColor: "#f6f7ff",
        borderRadius: "70px 0px 0px 70px",
        color: "#3A85F4",
    },
    display: "flex",
    justifyContent: "flex-start",
  },
  title:{
    "&:hover, &:focus": {
      color: "#3A85F4",
      },
  },
  externalLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none'
  },
  linkActive: {
    
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#FFFFFF",
    },
  },
  linkIcon: {
    color: "#FFFFFF",
    transition: theme.transitions.create("color"),
    width: 30,
    display: "flex",
    justifyContent: "flex-start",
    marginRight: theme.spacing(1),
  
  },
  linkIconActive: {
    color: "#FFFFFF",
    fontSize: 40,
    "&:hover, &:focus": {
      color: "#3A85F4",
      },
  },
  linkText: {
    padding: 0,
    color: "#FFFFFF",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
    fontFamily:'poppins',
    display: "flex",
    justifyContent: "flex-start",
    textIndent: 0,
    "&:hover, &:focus": {
      color: "#3A85F4",
      },

  },
  linkTextActive: {
    color: "#FFFFFF",
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
