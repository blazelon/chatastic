import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

export default ({ name, size, color }) => {
  return (
    <Icon name={name} size={size || 25} color={color || '#999'} />
  )
}
