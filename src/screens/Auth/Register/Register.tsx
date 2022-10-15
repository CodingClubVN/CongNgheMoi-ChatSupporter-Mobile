import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import StyleVariables from '../../../../StyleVariables'
import CButton from '../../../components/CButton'
import CInput from '../../../components/CInput'
import EButton from '../../../components/EButton'
import GradientView from '../../../components/GradientView'
import HideKeyboard from '../../../components/HideKeyboard'
import { IRegisterAccount } from '../../../models/Account'
import actions from '../../../redux/user/actions'

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const logo = require('../../../../assets/images/icon.png')
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.user.loading)
  const [account, setAccount] = useState<any>({
    username: '',
    password: '',
    confirmPassword: ''
  })
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

  const handleUsernameChange = (username: string) => {
    setAccount((state: IRegisterAccount) => ({
      username,
      password: state.password,
      confirmPassword: state.confirmPassword
    }))
  }

  const handlePasswordChange = (password: string) => {
    setAccount((state: IRegisterAccount) => ({
      username: state.username,
      password,
      confirmPassword: state.confirmPassword
    }))
  }

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setAccount((state: IRegisterAccount) => ({
      username: state.username,
      password: state.password,
      confirmPassword
    }))
  }

  const handleRegister = () => {
    const userNo = Math.floor(Math.random() * 10000)
    if (account.password !== account.confirmPassword) {
      Alert.alert('Password doesn\'t match', 'Register failed!')
      return
    }
    if (account.username && account.password) {
      dispatch({
        type: actions.REGISTER,
        payload: {
          user: {
            fullname: 'user' + userNo,
            account,
            email: 'user' + userNo + '@gmail.com',
            phone: '099999' + userNo
          }
        }
      })
    }
    return
  }

  const handleLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <GradientView isLoading={loading}>
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
              }}>Register</Text>
            </View>
            <View style={styles.inputContainer}>
              <CInput placeholder="Username" placeholderTextColor={StyleVariables.colors.gray200} value={account.username} onChangeText={handleUsernameChange} />
              <CInput secureTextEntry clearTextOnFocus placeholder="Password" placeholderTextColor={StyleVariables.colors.gray200} value={account.password} onChangeText={handlePasswordChange} />
              <CInput secureTextEntry clearTextOnFocus placeholder="Confirm Password" placeholderTextColor={StyleVariables.colors.gray200} value={account.confirmPassword} onChangeText={handleConfirmPasswordChange} />
            </View>
            <View style={styles.buttonContainer}>
              <CButton title='Register' btnProps={{
                onPress: handleRegister
              }} />
              <Button title='Login' onPress={handleLogin} color={StyleVariables.colors.black} />
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
    height: '35%'
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
    height: 210,
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

export default RegisterScreen