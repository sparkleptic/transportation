import React from 'react';
import PropTypes from 'prop-types';
import {
  Marker,
} from 'react-google-maps';

class TooltipMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onMouseOver(e) {
    this.setState({isOpen: true});
    if (this.props.onMouseOver) {
      this.props.onMouseOver();
    }
  }

  onMouseOut(e) {
    this.setState({isOpen: false});
    if (this.props.onMouseOut) {
      this.props.onMouseOut();
    }
  }

  render() {
    const {children, ...otherProps} = this.props;
    const {isOpen} = this.state;
    return (
      <Marker
        {...otherProps}
        onMouseOver={(e) => this.onMouseOver(e)}
        onMouseOut={(e) => this.onMouseOut(e)}
      >
        {isOpen && children}
      </Marker>
    );
  }
}

TooltipMarker.propTypes = {
};

export default TooltipMarker;
