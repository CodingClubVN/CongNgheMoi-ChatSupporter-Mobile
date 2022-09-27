import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, Pressable, Alert } from 'react-native'
import CButton from '../../../components/CButton'
import CInput from '../../../components/CInput'
import EButton from '../../../components/EButton'
import GradientView from '../../../components/GradientView'
import HideKeyboard from '../../../components/HideKeyboard'
import StyleVariables from '../../../StyleVariables'

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const logo = require('../../../assets/images/icon.png')
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = () => {
    setIsLoading(true)
    console.log(username, password)
    if (username === 'admin' && password === 'admin') {
      setTimeout(() => {
        Alert.alert('Success', 'Login success!')
        navigation.navigate('Root')
        setIsLoading(false)
      }, 1000)
    } else {
      setTimeout(() => {
        Alert.alert('Error', 'Invalid username or password')
        setIsLoading(false)
      }, 1000)
    }
  }
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

  const handleRegister = () => {
    navigation.navigate('Register')
  }
  return (
    <GradientView isLoading={isLoading}>
      <HideKeyboard>
        <View style={styles.loginWrapper}>
          <View style={styles.imageContainer}>
            <Image source={logo} style={styles.logoImg} />
            <Text style={styles.logoText}>Coding Club</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={{ marginVertical: 10, width: '100%', paddingLeft: '7.5%' }}>
              <Text style={{
                fontFamily: 'sf-pro-bold',
                fontSize: 30,
                color: StyleVariables.colors.gradientStart
              }}>Login</Text>
            </View>
            <View style={styles.inputContainer}>
              <CInput placeholder="Username" placeholderTextColor={StyleVariables.colors.gray200} value={username} onChangeText={setUsername} />
              <CInput secureTextEntry clearTextOnFocus placeholder="Password" placeholderTextColor={StyleVariables.colors.gray200} value={password} onChangeText={setPassword} />
              <Pressable style={{ width: '100%', marginLeft: '15%' }}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </Pressable>
            </View>
            <View style={styles.buttonContainer}>
              <CButton title='Login' btnProps={{
                onPress: handleLogin
              }} />
              <Button title='Register' onPress={handleRegister} color={StyleVariables.colors.black} />
              <View style={styles.divider} />
              <View style={styles.thirdParty}>
                {
                  thirdParty.map((item: { name: string, color: string, icon: string }) =>
                  (
                    <View key={item.name} style={{ width: 80 }}>
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