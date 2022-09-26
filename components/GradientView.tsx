import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView } from 'react-native'
import StyleVariables from '../StyleVariables'
import { StyleSheet } from 'react-native'

const GradientView = ({ children }: { children: JSX.Element }) => {
  return (
    <LinearGradient
      colors={[StyleVariables.colors.gradientStart, StyleVariables.colors.gradientEnd]}
      style={styles.view}
    >
      <SafeAreaView>
        {children}
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 30
  }
})

export default GradientView