import React from 'react';
import {
    Chip
} from 'material-ui';
import {styles}                             from '../../../css';
import { withStyles } from 'material-ui/styles';

class TimeChip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    handleDelete = () => {
        var data=this.props.value;
        console.log("unque",data);
        this.props.onDelete(data);
    }

    render() {
        const {
            value,
            classes,
            day,
            uniq
        } = this.props
        return(
            <Chip key={ uniq } label={value} onDelete={ this.handleDelete } className={ classes.chip } />
        );
    }
}

export default withStyles(styles)(TimeChip)