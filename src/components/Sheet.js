import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components'
import Gallery from './Gallery'
import ActionItems from './SheetActionItems'

const ACTION_ITEMS = [
  {
    id: 'gallery',
    title: 'Gallery',
    icon: 'image'
  },
  {
    id: 'audio',
    title: 'Audio',
    icon: 'headphones'
  },
  {
    id: 'file',
    title: 'File',
    icon: 'file'
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: 'user'
  },
  {
    id: 'camera',
    title: 'Camera',
    icon: 'camera'
  },
  {
    id: 'location',
    title: 'Location',
    icon: 'map-pin'
  },
  {
    id: 'gif',
    title: 'GIF',
    icon: 'youtube'
  },
  {
    id: 'close',
    title: '',
    icon: 'chevron-down'
  }
]

const Sheet = (props) => {
  const { galleryItems, isVisible, onHide, onPressGalleryItem, onPressActionItem } = props

  return (
    <Modal
      animationType='slide'
      backdropOpacity={0.1}
      isVisible={isVisible}
      onSwipeComplete={onHide}
      swipeDirection={['down']}
      onModalHide={onHide}
      onBackButtonPress={onHide}
      onBackdropPress={onHide}
      style={styles.modal}
    >
      <Content>
        <Draggable />
        <Gallery items={galleryItems} onPressItem={(item) => onPressGalleryItem(item)} />
        <ActionItems items={ACTION_ITEMS} onPressItem={(item) => onPressActionItem(item)} />
      </Content>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  actionItemsContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  }
})

const Content = styled.View`
  height: 400px;
  background-color: white;
  box-shadow: 0 -19px 38px rgba(0,0,0,0.30);
`
const Draggable = styled.View`
  background-color: #ededed;
  border-radius: 5px;
  height: 5px;
  margin: 10px auto;
  width: 50px;
`

export default Sheet
