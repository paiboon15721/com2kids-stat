import React from 'react'
import Select from 'react-select'
import map from 'lodash/map'
import { inject, observer } from 'mobx-react'

@inject('schoolStore')
@observer
class SelectProvince extends React.Component {
  componentDidMount() {
    this.props.schoolStore.fetchSchoolProvinces()
  }

  handleChange = selectedOption => {
    this.props.schoolStore.selectProvince(selectedOption)
  }

  render() {
    const { selectedProvince, schoolProvinces } = this.props.schoolStore
    const value = selectedProvince && selectedProvince.value
    const options = map(schoolProvinces, v => ({ value: v, label: v }))

    return (
      <Select
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={options}
      />
    )
  }
}

export default SelectProvince
