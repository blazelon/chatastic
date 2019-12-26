import React, { useState, useEffect, createContext } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
// import { send, subscribe } from 'react-native-training-chat-server'

import Header from './components/Header'
import Messages from './components/Messages'
import Composer from './components/Composer'
import theme from './theme'
import Constants from './Constants'
console.disableYellowBox = true

export const AppContext = createContext(Constants.USERNAME)
export const ThemeContext = createContext(theme)

const App = () => {
  const [messages, setMessages] = useState(Constants.MESSAGES)

  const sendMessage = async (newMessage) => {
    setMessages([{
      ...newMessage,
      sender: Constants.USERNAME,
      name: Constants.NAME,
      avatar: Constants.AVATAR
    }]
      .concat(messages)
    )
    console.log(messages);
    
  }

  return (
    <AppContext.Provider value={{ username: Constants.USERNAME, avatar: Constants.AVATAR }}>
      <ThemeContext.Provider value={{ ...theme }}>
        <Container>
          <Header title={Constants.CHANNEL} />
          <Messages items={messages} />
          <Composer onSend={(newMessage) => sendMessage(newMessage)} />
        </Container>
      </ThemeContext.Provider>
    </AppContext.Provider>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

export default App
