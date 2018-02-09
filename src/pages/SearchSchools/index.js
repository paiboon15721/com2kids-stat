import React from 'react'
import FilterSchools from './FilterSchools'
import SchoolsTable from './SchoolsTable'

class SearchSchools extends React.PureComponent {
  render() {
    return (
      <div>
        <FilterSchools />
        <SchoolsTable />
      </div>
    )
  }
}

export default SearchSchools
