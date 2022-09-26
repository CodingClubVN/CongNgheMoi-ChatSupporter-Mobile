import { FontAwesome } from "@expo/vector-icons"
import React from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"
import StyleVariables from "../StyleVariables"


const EButton = ({ btnProps, title }: { btnProps: any, title: any }) => {
  return (
    <Pressable {...btnProps} style={styles.pressableWrapper}>
      <View
        style={styles.btnWrapper}>
        <FontAwesome name={btnProps.icon} size={25} color={btnProps.color} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressableWrapper: {
    width: '85%',
  },
  btnWrapper: {
    width: 80,
    height: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: StyleVariables.colors.gray100
  },
})

export default EButton