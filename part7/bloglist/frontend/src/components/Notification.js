import React from 'react'
import { useSelector } from 'react-redux'

const notificationGreenStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}
const notificationRedStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }
  let tmpStyle = notificationRedStyle

  if (notification.color === 'green') {
    tmpStyle = notificationGreenStyle
  }
  return (
    <div className="notification" style={tmpStyle}>
      {notification.message}
    </div>
  )
}

export { Notification }
