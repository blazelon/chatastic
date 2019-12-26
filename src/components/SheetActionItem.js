import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'
import Icon from './Icon'

const SheetActionItem = (props) => {
  const { onPress, item, item: { icon, title } } = props

  return (
    <ActionItemContent onPress={() => onPress(item)}>
      <ActionItemIcon>
        <Icon name={icon} color='#fff' />
      </ActionItemIcon>
      <ActionItemText>{title}</ActionItemText>
    </ActionItemContent>
  )
}

const ActionItemContent = styled.TouchableOpacity`
  margin: 10px 15px;
`
const ActionItemIcon = styled.View`
  align-items: center;
  background-color: ${props => props.color || 'black'};
  border-radius: 30px;
  height: 60px;
  justify-content: center;
  width: 60px;
`
const ActionItemText = styled.Text`
  color: #999;
  margin-top: 10;
  text-align: center;
`

export default SheetActionItem
