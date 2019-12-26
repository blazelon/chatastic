import React, { useState, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from 'react-native'
import styled from 'styled-components'

import { AppContext, ThemeContext } from '../index'

const Messages = ({
  items
}) => {
  const app = useContext(AppContext)
  const theme = useContext(ThemeContext)

  const Item = (props) => {
    const { item } = props

    const innerContent = () => (
      <>
        {
          item.sender === app.username
            ? <SenderNameOutgoing>{item.name}</SenderNameOutgoing>
            : <SenderNameIncoming>{item.name}</SenderNameIncoming>
        }
        <Message message={item} />
      </>
    )

    const content = () => (
      <>
        <Avatar source={{ uri: item.avatar }} />
        {
          item.sender === app.username
            ? <InnerContentOutgoing>{innerContent()}</InnerContentOutgoing>
            : <InnerContentIncoming>{innerContent()}</InnerContentIncoming>
        }
      </>
    )

    return item.sender === app.username
      ? <ItemOutgoing>{content()}</ItemOutgoing>
      : <ItemIncoming>{content()}</ItemIncoming>
  }

  const Message = (props) => {
    const { message } = props

    if (message.type.includes('image')) {
      const { message: { uri } } = message
      return message.sender === app.username
        ? (
          <ImageOutgoing source={{ uri }} />
        )
        : (
          <ImageIncoming source={{ uri }} />
        )
    } else {
      return message.sender === app.username
        ? (
          <BubbleOutgoing>
            <MessageText>{message.message}</MessageText>
          </BubbleOutgoing>
        )
        : (
          <BubbleIncoming>
            <MessageText>{message.message}</MessageText>
          </BubbleIncoming>
        )
    }
  }

  return (
    <>
      <FlatList
        data={items}
        renderItem={({ item }) => <Item item={item} />}
        inverted
      />
      <Background />
    </>
  )
}

const ItemContent = styled.View`
  padding: 10px;
`
const ItemIncoming = styled(ItemContent)`
  flex-direction: row;
`
const ItemOutgoing = styled(ItemContent)`
  flex-direction: row-reverse;
`
const InnerContent = styled.View`
  max-width: 80%;
  padding: 10px 20px;
`
const InnerContentIncoming = styled(InnerContent)`
  justify-content: flex-start;
`
const InnerContentOutgoing = styled(InnerContent)`
  justify-content: flex-end;
`
const Bubble = styled.View`
  align-items: flex-start;
  background-color: #eee;
  border-radius: 10px;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 20px;
`
const BubbleIncoming = styled(Bubble)`
  border-top-left-radius: 0;
`
const BubbleOutgoing = styled(Bubble)`
  background-color: #fff;
  border-top-right-radius: 0;
`
const ImageContent = styled.Image`
  border-radius: 10px;
  height: 240px;
  resize-mode: cover;
  width: 240px;
`
const ImageIncoming = styled(ImageContent)`
  border-top-left-radius: 0;
`
const ImageOutgoing = styled(ImageContent)`
  border-top-left-radius: 10px;
  border-top-right-radius: 0;
`
const Avatar = styled.Image`
  border-radius: 20px;
  width: 40px;
  height: 40px;
`
const SenderName = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`
const SenderNameIncoming = styled(SenderName)`
  
`
const SenderNameOutgoing = styled(SenderName)`
  text-align: right;
`
const MessageText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  width: auto;
`
const Background = styled.View`
  background-color: #f6f6f6;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
`

export default Messages
