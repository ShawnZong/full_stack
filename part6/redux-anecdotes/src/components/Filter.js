import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
const mapDispatchToPropsFilter = { setFilter }
const ConnectedFilter = connect(null, mapDispatchToPropsFilter)(Filter)
export { Filter, ConnectedFilter }
