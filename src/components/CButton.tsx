import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import StyleVariables from '../../StyleVariables'

const CButton = ({ btnProps, title, disabled, textStyles = {} }: { btnProps: any, title: string, disabled?: boolean | any, textStyles?: any }) => {
  return (
    <TouchableOpacity disabled={disabled} {...btnProps} style={styles.pressableWrapper}>
      <LinearGradient
        colors={[!disabled ? StyleVariables.colors.gradientEnd : StyleVariables.colors.gray300, !disabled ? StyleVariables.colors.gradientStart : StyleVariables.colors.gray100]}
        start={[0, 0.1]}
        end={[1, 0.9]}
        style={styles.btnWrapper}>
        <Text style={{ ...styles.btnText, ...textStyles }}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pressableWrapper: {
    width: '85%',
  },
  btnWrapper: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sf-pro-med',
    color: '#F4FAFF',

  }
})

export default CButton
