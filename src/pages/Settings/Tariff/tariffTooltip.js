import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import {
    Icon
} from 'material-ui';
import { getAppliedTariffAndValue, appliedTariffData, getConditionData, getNewConditionData } from './utils';
import { getEntity } from '../../../actions/entity';

class TariffTooltip extends React.Component {

    state = {
        settingsData: []
    }

    getConditionsAndSetState = (conditions) => {

        if(!conditions) {
            return;
        }

        if(!conditions.length) {
            return;
        }

        getNewConditionData(conditions)
            .then(
                settingsData => this.setState({
                    settingsData
                })
            )
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.rowData.id !== this.props.rowData.id) {
            if(nextProps.rowData) {
                const {
                    condition
                } = nextProps.rowData;
        
                const conditions = condition;
    
                this.getConditionsAndSetState(conditions)
            }
        }
    }



    componentDidMount () {

        const {
            condition
        } = this.props.rowData;

        const conditions = condition;

        this.getConditionsAndSetState(conditions)
    }

    render () {
        const {
            id,
            special_tariff_name,
            formula
        } = this.props.rowData

        const {
            settingsData
        } = this.state
    
        const parsedAppliedTariff = getAppliedTariffAndValue(formula)
        const selectedTariff = appliedTariffData.find(
            tariff =>
                tariff.value == parsedAppliedTariff.appliedTariff
        )

        return (
            <div style={styles.container}>
                {this.props.data}
                <a data-tip data-for={`tariffTooltip${id}`}> <Icon style={styles.icon}>info</Icon> </a>
                <ReactTooltip
                    className="tariffTooltip"
                    place="right"
                    effect="float"
                    id={`tariffTooltip${id}`}>
                    <p className="tariffTooltip-tariff-name">{special_tariff_name}</p>
                    <div className="tariffTooltip-info-container">
                        <div className="tariffTooltip-info-child-container">
                            <p>Condition</p>
                            {
                                settingsData.map(
                                    (condition, index) => {
                                        return (
                                            <p key={index} className="indented">{condition.name}: {
                                                condition.value
                                            }</p>
                                        )
                                    }
                                )
                            }
                        </div>
                        {selectedTariff ? <div className="tariffTooltip-info-child-container">
                            <p>Applied Tariff</p>
                            <p className="indented">{selectedTariff.text}:  {parsedAppliedTariff.tariffValue}</p>
                        </div> : null }
                    </div>
                </ReactTooltip>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'inline',
        paddingLeft: 10
    },
    icon: {
        fontSize: 18
    }
}

export default TariffTooltip;