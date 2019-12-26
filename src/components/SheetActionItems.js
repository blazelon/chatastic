import React, { useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import styled from 'styled-components'
import ActionItem from './SheetActionItem'

const SheetActionItems = (props) => {
  const { items, onPressItem } = props

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={items}
      renderItem={({ item }) => <ActionItem item={item} onPress={(item) => onPressItem(item)} />}
      keyExtractor={(item, index) => index}
      numColumns={4}
      contentContainerStyle={styles.actionItemsContainer}
    />
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

export default SheetActionItems
