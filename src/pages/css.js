export const styles = (theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: '95%',
    minHeight: '40%',
    margin: '0% auto 2.3% auto',
  },
  paperBg: {
    backgroundColor: theme.palette.background.paper,
  },
  join_widgets: {
    // height: '520px',
    display: 'flex',
  },
  body1: {
    fontSize: '1.2rem',
    paddingLeft: '20px',
  },
  bodyTitleText: {
    fontSize: '1.2rem',
  },
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    marginTop: theme.spacing.unit * 3,
  },
  cardHeader: {
    paddingBottom: 0,
  },
  flex: {
    flex: 1,
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: '10   px solid #ececec',
      },
    },
  },
  headerWrapper: {
    width: '92%',
    minHeight: '40%',
    margin: '-10px auto 10px auto',
  },
  pageTitle: {
    marginBottom: 35,
    marginTop: '2%',
  },
  breadCrumbs: {
    float: 'left',
    color: '#323990',
    fontSize: 14,
  },
  transactionBreadcrumbs: {
    color: 'black',
    margin: 0,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  titleWrapperTitles: {
    flex: '0 0 auto',
    padding: '2% 1%',
    textTransform: 'capitalize',
  },
  titleWrapper: {
    fontSize: window.innerWidth >= 1024 ? 26 : 15,
    fontWeight: 'bold',
    marginTop: window.innerWidth >= 1024 ? 0 : 2,
    marginBottom: 0,
    textTransform: 'capitalize',
  },
  formWrapper: {
    padding: 30,
    width: '100%',
    textTransform: 'capitalize',
  },
  textField: {
    /*marginLeft: theme.spacing.unit,
     marginRight: theme.spacing.unit,*/
    marginTop: 37,
    marginBottom: 0,
    width: '100%',
    maxWidth: 600,
  },
  chipWrapper: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    flexDirection: 'reverse',
  },
  menu: {
    top: 0,
    width: 200,
  },
  prefferedWrapper: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
  },
  prefferedTitle: {
    float: 'left',
    width: '50%',
  },
  prefferedBtn: {
    marginLeft: theme.spacing.unit * 2,
    float: 'left',
  },
  hours: {
    marginRight: 20,
    width: 150,
  },
  minutes: {
    width: 150,
  },
  serviceTextField: {
    marginLeft: theme.spacing.unit * 17,
    marginRight: theme.spacing.unit,
    top: theme.spacing.unit + 3,
    width: 200,
    // float: 'right'
  },
  maxWeight: {
    marginLeft: theme.spacing.unit * 17,
    // float: 'right',
  },
  packingkayuStatusCount: {

  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  chip: {
  margin: 4,
  // paddingLeft: 2,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    
    typography:{
      fontSize:20,
      padding:0,
    },

  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
  },


  noPadding: {
    padding: 0,
  },

  voidColor: {
    color: '#e53935',
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  nameIcon: {
    width: 32,
    height: 32,
    marginLeft: 10,
    marginBottom: 6,
  },
  nameField: {
    marginBottom: 6,
    width: '100%',
    maxWidth: 558,
  },
});