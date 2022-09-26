import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, Button, BackHandler, Pressable } from 'react-native'
import CButton from '../../../components/CButton'
import CInput from '../../../components/CInput'
import EButton from '../../../components/EButton'
import GradientView from '../../../components/GradientView'
import HideKeyboard from '../../../components/HideKeyboard'
import StyleVariables from '../../../StyleVariables'

const LoginScreen = () => {
  const logo = require('../../../assets/images/icon.png')
  const thirdParty = [
    {
      name: 'Google',
      color: StyleVariables.colors.gradientEnd,
      icon: 'google'
    },
    {
      name: 'Facebook',
      color: StyleVariables.colors.gradientEnd,
      icon: 'facebook'
    },
    {
      name: 'Twitter',
      color: StyleVariables.colors.gradientEnd,
      icon: 'twitter'
    }
  ]
  return (
    <GradientView>
      <HideKeyboard>
        <View style={styles.loginWrapper}>
          <View style={styles.imageContainer}>
            <Image source={logo} style={styles.logoImg} />
            <Text style={styles.logoText}>Coding Club</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <CInput placeholder="Username" placeholderTextColor={StyleVariables.colors.gray200} />
              <CInput secureTextEntry clearTextOnFocus placeholder="Password" placeholderTextColor={StyleVariables.colors.gray200} />
              <Pressable style={{ width: '100%', marginLeft: '15%' }}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </Pressable>
            </View>
            <View style={styles.buttonContainer}>
              <CButton title='Login' btnProps={undefined} />
              <Button title='Register' color={StyleVariables.colors.black} />
              <View style={styles.divider} />
              <View style={styles.thirdParty}>
                {
                  thirdParty.map((item: { name: string, color: string, icon: string }) =>
                  (
                    <View style={{ width: 80 }}>
                      <EButton title={item.name} btnProps={{ icon: item.icon, color: item.color }} />
                    </View>
                  )
                  )
                }
              </View>
            </View>
          </View>
        </View>
      </HideKeyboard>
    </GradientView>
  )
}

const styles = StyleSheet.create({
  thirdParty: {
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    fontFamily: 'sf-pro-reg',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: StyleVariables.colors.gradientEnd
  },
  divider: {
    width: '30%',
    height: 1,
    backgroundColor: StyleVariables.colors.gray200,
    marginBottom: 10
  },
  loginWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 50
  },
  imageContainer: {
    height: '40%'
  },
  logoImg: {
    width: 175,
    height: 175
  },
  logoText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'sf-pro-bold',
    textAlign: 'center',
    color: StyleVariables.colors.white
  },
  inputContainer: {
    width: '100%',
    height: 170,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  formContainer: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: StyleVariables.colors.white,
    borderRadius: 10,
    paddingVertical: 15
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 200
  }
})

export default LoginScreen