// @flow

import React from 'react';
import {Route} from 'react-router';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Typography, Button, Paper} from 'material-ui';

import bagOnlyMenu from '../../../assets/images/unbagging-bag-only.png';
import bagConnoteMenu from '../../../assets/images/unbagging-bag-connote.png';

export default function MenuScene() {
  return (
    <Route>
      {({history}) => {
        return (

          /*<View style={styles.menuContainer}>*/
          /*<View style={{flex: 1, flexDirection: 'row'}}>*/

          <View style={styles.menuContainer}>

            <Menu
              type="bag-only"
              onPress={() => {
                history.push('/inventory/unbagging/bag-only');
              }}
            />
            <Menu
              type="bag-connote"
              onPress={() => {

                /*history.push('/inventory/unbagging/bag-connote');*/
                /*history.push('/inventory/unbagging/bagConnote');*/
                history.push('/inventory/unbagging/bag-connote');
              }}
            />
          </View>
        );
      }}
    </Route>
  );
}

type MenuProps = {
  type: 'bag-only' | 'bag-connote',
  onPress: () => void,
};

type MenuState = {
  isMouseHovering: boolean,
};

export class Menu extends React.Component<MenuProps, MenuState> {
  state = {
    isMouseHovering: false,
  };
  render() {
    let {type, onPress} = this.props;
    let {isMouseHovering} = this.state;
    let imageSource;
    let title;
    let buttonTitle;
    if (type === 'bag-only') {
      imageSource = bagOnlyMenu;
      title = 'Bag Only';
      buttonTitle = 'Scan Bag';
    } else {
      imageSource = bagConnoteMenu;
      title = 'Bag & Connote';
      buttonTitle = 'Scan Bag & Connote';
    }
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.menuRoot, isMouseHovering && styles.viewHovered]}
        onMouseOver={() => {
          this.setState({
            isMouseHovering: true,
          });
        }}
        onMouseOut={() => {
          this.setState({
            isMouseHovering: false,
          });
        }}
      >
        <Typography variant="title" style={StyleSheet.flatten(styles.item)}>
          {title}
        </Typography>
        <Image source={imageSource} style={styles.image} />
        <Button
          onClick={onPress}
          variant="raised"
          color="primary"
          style={StyleSheet.flatten(styles.item)}
        >
          {buttonTitle}
        </Button>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  menuRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  viewHovered: {
    backgroundColor: 'white',
    boxShadow:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  image: {
    width: 200,
    height: 200,
  },
  item: {
    marginTop: 80,
    marginBottom: 80,
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
