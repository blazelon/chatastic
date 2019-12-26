import React, { useContext } from 'react'
import { View, Text, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components'
import Icon from './Icon'
import { AppContext, ThemeContext } from '../index'

const Header = ({ title }) => {
  const app = useContext(AppContext)

  return (
    <Container
      colors={['#f70c9d', '#f07142']}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.6]}
    >
      <StatusBar backgroundColor='#f70c9d' barStyle='light-content' />
      <Content>
        <Icon name='chevron-left' color='#fff' />
        <Avatar source={{ uri: app.avatar }} />
      </Content>
    </Container>
  )
}

const Container = styled(LinearGradient)`
  height: 60px;
`
const Content = styled.View`
  align-items: center;
  background-color: #f70c9d;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`
const Avatar = styled.Image`
  border-radius: 20px;
  width: 40px;
  height: 40px;
`

export default Header
