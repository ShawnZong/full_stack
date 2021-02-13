import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const ReturnButton = () => {
  const history = useHistory()
  const handleReturn = () => {
    // history.push('/users')
    history.goBack()
  }
  return (
    <Button onClick={handleReturn} variant="secondary">
      return
    </Button>
  )
}

export { ReturnButton }
