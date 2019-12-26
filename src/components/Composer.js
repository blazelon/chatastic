import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import ImagePicker from 'react-native-image-crop-picker'
import styled from 'styled-components'
import Sheet from './Sheet'
import Icon from './Icon'

const Composer = ({
  onSend
}) => {
  const [typing, setTyping] = useState('')
  const [photos, setPhotos] = useState([])
  const [isSheetVisible, setSheetVisibility] = useState(false)

  const onSendMessage = () => {
    onSend({ message: typing, type: 'text/plain' })
    setTyping('')
  }

  const onSendMedia = (image) => {
    onSend({ message: image, type: image.type })
    setSheetVisibility(false)
  }

  const openSheet = () => {
    setSheetVisibility(true)
  }

  const openPicker = (actionItem) => {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: actionItem.mediaType || 'any',
      includeBase64: true
    }).then(image => {
      onSendMedia({ uri: image.path, type: image.mime })
    })
  }

  const openCamera = (actionItem) => {
    ImagePicker.openCamera({
      cropping: false,
      mediaType: actionItem.mediaType || 'any',
      includeBase64: true
    }).then(image => {
      onSendMedia({ uri: image.path, type: image.mime })
    })
  }

  const onPressGalleryItem = (item) => {
    onSendMedia(item)
  }

  const onPressActionItem = (actionItem) => {
    if (actionItem.id === 'close') {
      setSheetVisibility(false)
    }
    if (actionItem.id === 'gallery') {
      openPicker(actionItem)
    }
    if (actionItem.id === 'camera') {
      openCamera(actionItem)
    }
  }

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 20000,
      assetType: 'All'
    })
      .then(r => {
        setPhotos(r.edges.map(item => ({
          timestamp: item.node.timestamp,
          groupName: item.node.group_name,
          type: item.node.type,
          ...item.node.image
        })))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <KeyboardAvoidingView>
      <>
        <ComposerContent>
          <ComposerAction
            onPress={openSheet}
          >
            <Icon name='paperclip' />
          </ComposerAction>
          <ComposerInput
            value={typing}
            underlineColorAndroid='transparent'
            placeholder='Type something nice'
            onChangeText={text => setTyping(text)}
          />
          <ComposerActions>
            {
              typing.length === 0
                ? (
                  <ComposerAction
                    onPress={() => null}
                  >
                    <Icon name='mic' />
                  </ComposerAction>
                )
                : (
                  <ComposerAction
                    onPress={onSendMessage}
                    disabled={typing.length === 0}
                  >
                    <Icon name='send' />
                  </ComposerAction>
                )
            }
          </ComposerActions>
        </ComposerContent>
        <Sheet
          galleryItems={photos}
          isVisible={isSheetVisible}
          onHide={() => setSheetVisibility(false)}
          onPressGalleryItem={(item) => onPressGalleryItem(item)}
          onPressActionItem={(item) => onPressActionItem(item)}
        />
      </>
    </KeyboardAvoidingView>
  )
}

const ComposerContent = styled.View`
  background-color: #fff;
  box-shadow: 0 -19px 38px rgba(0,0,0,0.30);
  flex-direction: row;
  padding: 10px;
`
const ComposerInput = styled.TextInput`
  background-color: #f3f3f3;
  border: 1px solid #c7c7c7;
  border-radius: 60px;
  padding: 0px 20px;
  font-size: 16px;
  flex: 1;
`
const ComposerActions = styled.View`
  flex-direction: row;
`
const ComposerAction = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  width: 40px;
`

export default Composer
