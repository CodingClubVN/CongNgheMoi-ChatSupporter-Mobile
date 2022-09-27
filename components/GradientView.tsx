import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView } from 'react-native'
import StyleVariables from '../StyleVariables'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const GradientView = ({ isLoading, children }: { isLoading: boolean, children: JSX.Element }) => {
  return (
    <LinearGradient
      colors={[StyleVariables.colors.gradientStart, StyleVariables.colors.gradientEnd]}
      style={styles.view}
    >
      <SafeAreaView>
        {children}
      </SafeAreaView>
      {
        isLoading ? (<View style={{
          width: '117%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large" color={StyleVariables.colors.gradientStart} />
        </View>) : null
      }
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
    position: 'relative'
  }
})

export default GradientView