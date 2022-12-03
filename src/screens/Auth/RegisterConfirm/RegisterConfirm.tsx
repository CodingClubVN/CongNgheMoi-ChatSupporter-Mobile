import { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import StyleVariables from '../../../../StyleVariables'
import HideKeyboard from '../../../components/HideKeyboard'
import actions from '../../../redux/user/actions'
import GradientView from '../../../components/GradientView'
import CInput from '../../../components/CInput'
import CButton from '../../../components/CButton'
import EButton from '../../../components/EButton'

const RegisterConfirmScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { account } = route.params
  const logo = require('../../../../assets/images/icon.png')
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.user.loading)
  const [additional, setAdditional] = useState<any>({
    fullname: '',
    email: '',
    phone: ''
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

  const handleFullnameChange = (fullname: string) => {
    setAdditional((state: any) => ({
      fullname,
      email: state.email,
      phone: state.phone
    }))
  }

  const handleEmailChange = (email: string) => {
    setAdditional((state: any) => ({
      fullname: state.fullname,
      email,
      phone: state.phone
    }))
  }

  const handlePhoneChange = (phone: string) => {
    setAdditional((state: any) => ({
      fullname: state.fullname,
      email: state.email,
      phone
    }))
  }

  const handleRegister = () => {
    Keyboard.dismiss()
    // TODO: Regex fullname, email, phone
    if (additional.fullname && (additional.email || additional.phone)) {
      dispatch({
        type: actions.VALIDATE_EMAIL,
        payload: {
          data: {
            email: additional.email,
            phone: additional.phone || '',
            username: account.username
          },
          callback: () => {
            dispatch({
              type: actions.SEND_OTP,
              payload: {
                data: {
                  fullname: additional.fullname,
                  email: additional.email,
                },
                callback: () => {
                  navigation.navigate('OTPConfirm', {
                    account,
                    additional
                  })
                }
              }
            })
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
        <KeyboardAvoidingView keyboardVerticalOffset={20} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.loginWrapper}>
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
              }}>Confirm your account</Text>
            </View>
            <View style={styles.inputContainer}>
              <CInput placeholder="Fullname" placeholderTextColor={StyleVariables.colors.gray200} value={additional.fullname} onChangeText={handleFullnameChange} />
              <CInput placeholder="Email" placeholderTextColor={StyleVariables.colors.gray200} value={additional.email} onChangeText={handleEmailChange} />
              <CInput placeholder="Phone (Optional)" placeholderTextColor={StyleVariables.colors.gray200} value={additional.phone} onChangeText={handlePhoneChange} />
            </View>
            <View style={styles.buttonContainer}>
              <CButton disabled={!additional.fullname && (!additional.email || !additional.phone)} title='Register' btnProps={{
                onPress: handleRegister
              }} />
              <Button title='Back' onPress={() => {
                navigation.goBack()
              }} color={StyleVariables.colors.black} />
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
        </KeyboardAvoidingView>
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

export default RegisterConfirmScreen