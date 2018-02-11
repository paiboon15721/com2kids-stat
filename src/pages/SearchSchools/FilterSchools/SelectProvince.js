import React from 'react'
import Select from 'react-select'

class SelectProvince extends React.PureComponent {
  state = {
    selectedOption: '',
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  render() {
    const { selectedOption } = this.state
    const value = selectedOption && selectedOption.value

    return (
      <Select
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
      />
    )
  }
}

export default SelectProvince
