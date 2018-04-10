import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native';
import {NavLink, withRouter} from 'react-router-dom';
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  List,
  Select,
  MenuItem,
  Badge,
  Avatar,
  FormControl,
  ListItem,
  ListItemText,
  Icon,
} from 'material-ui';
import {Collapse} from 'material-ui/transitions';
import {withStyles} from 'material-ui/styles';
import {grey} from 'material-ui/colors';
import {
  Dehaze,
  Search,
  NotificationsNone,
  ExpandLess,
  ExpandMore,
} from 'material-ui-icons';
import Tools from './components/Tools';
import NotificationButton from '../../components/NotificationButton';
import {jneLogo} from '../../CusIcons/CustomIcons';
import {drawerMenuList} from './DrawerList';
import axios from 'axios';
import {BASE_API} from '../../api';

import {headerConnector} from '../../store/redux-connect';
import ReactMaterialUiNotifications from '../../components/ReactMaterialUiNotifications';
import fetchJSON from '../../helpers/fetchJSON';
import getDrawerMenu from '../../helpers/getDrawerMenu';

const Styles = (theme) => ({
  spaceLogo: {
    flex: 1,
  },
  MenuIcon: {
    color: theme.palette.primary[900],
    marginLeft: -12,
    marginRight: 20,
  },
  icon: {
    color: theme.palette.primary[900],
    marginRight: 20,
  },
  appBar: {
    backgroundColor: '#ffffff',
  },
  list: {
    width: 270,
    color: '#fafafa',
  },
  listColor: {
    color: '#fafafa',
  },
  name: {
    color: '#fafafa',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    color: '#fafafa',
  },
  badge: {
    color: theme.palette.primary[900],
    marginRight: 20,
  },
  avatar: {
    backgroundColor: grey[300],
    margin: 10,
    width: 27,
    height: 27,
  },
  formControl: {
    marginRight: 20,
    minWidth: 120,
    color: theme.palette.primary[900],
  },
  linkMatched: {
    backgroundColor: '#ac2d17',
  },
});
class Header extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      locationValue: 0,
      packageValue: 1,
      openNestedList: '',
      searchBarCout: false,
      matched: false,
      nodeArr: [],
      initNode: true,
    };
    this.drawerHandler = this.drawerHandler.bind(this);
    // this.DDpkgitem = this.DDpkgitem.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleMatched = this.handleMatched.bind(this);
  }
  drawerHandler = () => this.setState({open: !this.state.open});

  handlelLocationChange = (e) => {
    const {value} = e.target;
    if (this.props.pagedata.pageIsDirty) {
      if (window.confirm("You have unsaved changes, are you sure you want to leave?")) {
        this.changeNode(value)
      }
      return;
    }
    this.changeNode(value);
  };
  changeNode = (value) => {
    this.props.onActiveNodeChanged(value);
    const {locationChange} = this.props;
    return new Promise((resolve, reject) => {
        resolve(locationChange());
    });
  }
  toggleDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleExpandList = (item) => {
    const {openNestedList} = this.state;
    this.setState({
      openNestedList:
        openNestedList.moduleName === item.moduleName ? false : item,
    });
  };
  handleSearchBar = () =>
    this.setState({searchBarCout: !this.state.searchBarCout});
  handleMatched = () => {
    const {match, location} = this.props.children.props;
    return match.path === location.pathName
      ? this.setState({matched: true})
      : this.setState({matched: false});
  };
  render() {
    const {classes, user, permissionList, nodes, currentNode} = this.props;
    const {toggleDrawer} = this;
    const {
      open,
      searchBarCout,
      locationValue,
      openNestedList,
      matched,
    } = this.state;
    const dropdownItems = [
      'JNE Jakarta',
      'JNE Depok',
      'JNE Bogor',
      'JNE Bandung',
    ];

    if (!user) {
      return null;
    }
    let {permission} = user;
    let orderedMenus = getDrawerMenu(
      drawerMenuList,
      permission.map((menu) => {
        return permissionList.get(menu);
      }),
    );
    const sideList = orderedMenus.map((item, index) => (
      <List key={index}>
        {!item.nested && (
          <ListItem
            className={classes.list}
            component={NavLink}
            to={item.route || ''}
            onClick={toggleDrawer}
            button
          >
            <ListItemText
              primary={item.moduleName}
              classes={{primary: classes.listColor}}
            />
          </ListItem>
        )}
        {item.nested && (
          <ListItem
            className={classes.list}
            onClick={() => this.handleExpandList(item)}
            button
          >
            <ListItemText
              primary={item.moduleName}
              classes={{
                textDense: classes.listColor,
                primary: classes.listColor,
              }}
            />

            {openNestedList.moduleName === item.moduleName ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>
        )}

        <Collapse
          component="li"
          in={openNestedList.moduleName === item.moduleName ? true : false}
          timeout="auto"
          unmountOnExit
        >
          {item.nested &&
            item.nested.map((item, index) => (
              <List disablePadding key={index}>
                <ListItem
                  className={classes.nested}
                  component={NavLink}
                  to={item.route}
                  onClick={toggleDrawer}
                  button
                >
                  <ListItemText
                    inset
                    primary={item.moduleName}
                    classes={{
                      textDense: classes.listColor,
                      primary: classes.listColor,
                    }}
                  />
                </ListItem>
              </List>
            ))}
        </Collapse>
      </List>
    ));
    return (
      <div>
        {
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                onClick={this.drawerHandler}
                className={classes.MenuIcon}
              >
                <Dehaze />
              </IconButton>
              <div className={classes.spaceLogo}>
                <NavLink to="/">
                  <img src={jneLogo} alt="Logo" />
                </NavLink>
              </div>
              <FormControl
                className={classes.formControl}
                // color={Styles.icon.color}
              >
              {nodes &&
                <Select value={currentNode} onChange={this.handlelLocationChange}>
                {
                  nodes.map((node, index) => (
                    <MenuItem key={index} value={node.nodeID}>
                      {node.nodeName}
                    </MenuItem>
                  ))}
                </Select>
              }
              </FormControl>
              <Tools user={user} />
            </Toolbar>
            <Drawer open={open} onClose={this.drawerHandler}>
              <div tabIndex={0} role="button">
                {sideList}
              </div>
            </Drawer>
          </AppBar>
        }
        <div
          style={{
            width: '100%',
            height: '100vh',
            paddingTop: 80,
          }}
          className={'mainwrappercl'}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}


// function mapStateToProps(state) {
//   return {
//     user: state.user,
//     permissionList: state.permission.list,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     onActiveNodeChanged: (nodeID) => {
//       dispatch({
//         type: 'ACTIVE_NODE_CHANGED',
//         nodeID,
//       });
//     },
//   };
// }

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(Header)),
// );

export default withRouter(headerConnector(withStyles(Styles)(Header)));

