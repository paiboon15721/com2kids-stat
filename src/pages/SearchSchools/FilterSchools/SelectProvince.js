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
    this.props.schoolStore.q.province = selectedOption && selectedOption.value
  }

  render() {
    const { className, schoolStore } = this.props
    const { q, schoolProvinces } = schoolStore
    const options = map(schoolProvinces, v => ({ value: v, label: v }))

    return (
      <div>
        <label>Select Province:</label>
        <Select
          className={className}
          name="form-field-name"
          value={q.province}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    )
  }
}

export default SelectProvince
