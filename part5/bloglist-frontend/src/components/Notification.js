import React from 'react';

const notificationGreenStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
};
const notificationRedStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
};
const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  let tmpStyle = notificationRedStyle;
  if (notification.type === 'green') {
    tmpStyle = notificationGreenStyle;
  }
  return <div style={tmpStyle}>{notification.message}</div>;
};

export { Notification };
