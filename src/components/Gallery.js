import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, View, FlatList, TouchableOpacity, Image } from 'react-native'
import styled from 'styled-components'

const Gallery = ({ visible, items, onPressItem }) => {
  const Item = ({ item }) => {
    return (
      <ItemContent onPress={() => onPressItem(item)}>
        <Thumbnail
          source={{ uri: item.uri }}
          resizeMode='cover'
        />
      </ItemContent>
    )
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={items}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item, index) => index}
      contentContainerStyle={styles.galleryContainer}
    />
  )
}

const styles = StyleSheet.create({
  galleryContainer: {
    borderWidth: 1,
    borderColor: 'red',
    height: 84
  }
})

const ItemContent = styled.TouchableOpacity`
  align-items: center;
  height: 84px;
  justify-content: center;
  width: 84px;
`
const Thumbnail = styled.Image`
  height: 80px;
  margin: 2px;
  width: 80px;
`

export default Gallery
