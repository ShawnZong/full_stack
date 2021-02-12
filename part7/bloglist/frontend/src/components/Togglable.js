import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id="showTogglable" onClick={toggleVisibility}>
          {props.showLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <Button id="hideTogglable" onClick={toggleVisibility}>
          {props.hideLabel}
        </Button>
        {props.children}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'
export default Togglable
