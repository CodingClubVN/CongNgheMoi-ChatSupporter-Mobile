import { useFonts } from 'expo-font'
import React from "react"
import { StyleSheet, TextInput, TouchableOpacity } from "react-native"
import StyleVariables from '../StyleVariables'

const CInput = (props: any) => {
  return (
    <TextInput style={styles.textInput} {...props} />
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 10,
    backgroundColor: StyleVariables.colors.white,
    width: '85%',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sf-pro-med',
    color: StyleVariables.colors.black,
    borderColor: StyleVariables.colors.gray400,
    borderWidth: 1
  }
})
export default CInput
