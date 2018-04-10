import { getEntity } from "../../../actions/entity";

export const getAppliedTariffAndValue = (formula) => {

    const equalsToIndex = formula.indexOf('=')
    const asteriskIndex = formula.indexOf('*')
    const hyphenIndex = formula.indexOf('-')
  
    if(equalsToIndex > -1) {
      let value = formula.substring(equalsToIndex + 1, formula.length);
      return ({
        appliedTariff: 'flat',
        tariffValue: parseInt(value.trim())
      })
    }
  
    if((asteriskIndex > -1) && (hyphenIndex > -1)) {
      let parenthesisIndex = formula.indexOf('(')
      let value = formula.substring(parenthesisIndex + 1, asteriskIndex);
      
      return ({
        appliedTariff: 'percentage',
        tariffValue: parseFloat(value.trim()) * 100
      })
    }
  
    if(hyphenIndex > -1) {
      let value = formula.substring(hyphenIndex + 1, formula.length);
      return ({
        appliedTariff: 'amount',
        tariffValue: parseInt(value.trim())
      })
    }
  }
  
  export const appliedTariffData = [
    {
      text: 'Flat Rate',
      value: 'flat',
      tariff: {
        label: 'All Weight'
      } 
    },
    {
      text: 'Discount %',
      value: 'percentage',
      tariff: {
        label: 'Discount Percentage'
      } 
    },
    {
      text: 'Discount Rp',
      value: 'amount',
      tariff: {
        label: 'Discount Rp'
      } 
    }
  ]

  export const resolveConditionOptions = (condition) => {
    return new Promise (
        (response, reject) => {
            if(condition && condition.api) {
                getEntity(condition.api.url)
                    .then(conditionResponse => {
                        const {
                            data
                        } = conditionResponse.data

                        let settingsData = {}

                        settingsData.optionsList = data;
                        settingsData.api = condition.api;
                        settingsData.selectedValue = 0;
                        settingsData.text = condition.text;
                        response(settingsData)
                    })
            } else {
                let settingsData = {}
                settingsData.optionsList = undefined;
                settingsData.api = undefined;
                settingsData.selectedValue = undefined;
                settingsData.text = condition.text;
                response(settingsData)
            }
        }
    )
}

export const resolveNewConditionOptions = (condition) => {
    return new Promise (
        (response, reject) => {
            if(condition && condition.source_dropdown && condition.source_dropdown.url) {
                getEntity(`${condition.source_dropdown.url}/${condition.value_condition}`)
                    .then(conditionValue => {

                        let valueLabel = '';

                        if(conditionValue && conditionValue.data && conditionValue.data.data) {
                            valueLabel = conditionValue.data.data[condition.source_dropdown.text]
                        }

                        response({
                            name: condition.source_dropdown.condition_name,
                            value: valueLabel
                        })
                    })
                    .catch(() => {
                        response({
                            name: condition.source_dropdown.condition_name,
                            value: condition.value_condition
                        })
                    })
            } else {
                response({
                    name: condition.source_dropdown.condition_name,
                    value: condition.value_condition
                })
            }
        }
    )
}

export const getNewConditionData = (conditions = []) => {

    return new Promise ((response, reject) => {

        const conditionsPromises = conditions.map(
            condition => resolveNewConditionOptions(condition)
        )

        Promise.all(conditionsPromises)
            .then(res => response(res))

    })

}

  export const getConditionData = (conditions = []) => {

    return new Promise ((response, reject) => {

        if(conditions && conditions.length) {
            getEntity('special_tariff_condition').then(tariffConditions => {
                let conditionsFromApi = tariffConditions.data.data
                
                let conditionPromiseArr = conditions.map(
                    condition => {
                        const selectedCondition = conditionsFromApi.find(
                            conditionWithData => conditionWithData.value == condition.condition
                        )
                        return resolveConditionOptions(selectedCondition)
                    }
                )

                Promise.all(conditionPromiseArr)
                    .then(resolvedConditions => {
            
                        const settingsData = [...resolvedConditions.map(
                            (condition, index) => ({
                                ...condition,
                                selected: conditions[index].condition,
                                selectedValue: isNaN(conditions[index].value_condition) ? 
                                conditions[index].value_condition :
                                parseInt(conditions[index].value_condition)
                            })
                        )]
            
                        response(settingsData)
                    })

            })
        } else {
            reject([])
        }

    })

}