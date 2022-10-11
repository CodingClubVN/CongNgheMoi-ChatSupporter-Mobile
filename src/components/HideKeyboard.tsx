import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

const HideKeyboard = ({ children }: {children: JSX.Element}) => {
  const handleOnPress = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      { children } 
    </TouchableWithoutFeedback>
  )

}

export default HideKeyboard
