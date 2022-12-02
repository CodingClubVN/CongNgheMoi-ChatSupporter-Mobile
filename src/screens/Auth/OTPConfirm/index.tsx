import { useRoute } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { Image, View, Text, Alert, Keyboard, StyleSheet, Platform, Button, KeyboardAvoidingView, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import StyleVariables from '../../../../StyleVariables'
import CButton from '../../../components/CButton'
import CInput from '../../../components/CInput'
import EButton from '../../../components/EButton'
import GradientView from '../../../components/GradientView'
import HideKeyboard from '../../../components/HideKeyboard'
import { IRegisterAccount } from '../../../models/Account'
import actions from '../../../redux/user/actions'

const OTPConfirm = ({ navigation }: any) => {
  const logo = require('../../../../assets/images/icon.png')
  const dispatch = useDispatch()
  const route = useRoute<any>()
  const celebImage = require('../../../../assets/images/celeb.png')
  const loading = useSelector((state: any) => state.user.loading)
  const [showCeleb, setShowCeleb] = useState(false)
  const { account, additional } = route.params
  const otp2 = useRef<any>(null)
  const otp3 = useRef<any>(null)
  const otp4 = useRef<any>(null)
  const otp5 = useRef<any>(null)
  const otp6 = useRef<any>(null)
  const [otp, setOTP] = useState({
    otp1: '0',
    otp2: '0',
    otp3: '0',
    otp4: '0',
    otp5: '0',
    otp6: '0'
  })

  const handleStart = () => {
    navigation.navigate('Root')
  }

  const handleConfirm = () => {
    console.log({
      otp: otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4 + otp.otp5 + otp.otp6,
      email: additional.email
    })
    dispatch({
      type: actions.VALIDATE_OTP,
      payload: {
        data: {
          otp: otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4 + otp.otp5 + otp.otp6,
          email: additional.email
        },
        callback: () => {
          dispatch({
            type: actions.REGISTER,
            payload: {
              user: {
                fullname: additional.fullname,
                account: {
                  username: account.username,
                  password: account.password
                },
                email: additional.email,
                phone: additional.phone
              },
              callback() {
                dispatch({
                  type: actions.LOGIN,
                  payload: {
                    account: {
                      username: account.username,
                      password: account.password
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
    setShowCeleb(!showCeleb)
  }

  const handleCancel = () => {
    navigation.goBack()
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
              }}>Confirm your email</Text>
              {
                showCeleb ? (
                  <Text style={{
                    fontFamily: 'sf-pro-reg',
                    fontSize: 16,
                    color: StyleVariables.colors.gray300,
                    marginVertical: 5
                  }}>Confirmation successful!</Text>
                ) : (
                  <>
                    <Text style={{
                      fontFamily: 'sf-pro-reg',
                      fontSize: 16,
                      color: StyleVariables.colors.gray300,
                      marginVertical: 5
                    }}>Email has been sent </Text>
                    <Text style={{
                      fontFamily: 'sf-pro-reg',
                      fontSize: 16,
                      color: StyleVariables.colors.gray300,
                      marginBottom: 5
                    }}>to {additional.email}</Text>
                  </>
                )
              }
            </View>
            <View style={styles.inputContainer}>
              {
                showCeleb ? (
                  <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={celebImage} style={{
                      height: '100%',
                      resizeMode: 'contain',
                      marginRight: 20
                    }} />
                  </View>

                ) : (
                  <View style={{
                    flexDirection: 'row',
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: '7.5%'
                  }}>
                    <View style={{
                      width: 45,
                      height: 45,
                      backgroundColor: StyleVariables.colors.gray100,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TextInput
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                          setOTP({ ...otp, otp1: text });
                          if (text.length > 0) {
                            otp2.current.focus()
                          }
                        }}
                        maxLength={1} placeholder='0' style={{
                          fontFamily: 'sf-pro-reg',
                          fontSize: 24,
                          color: StyleVariables.colors.gray300,
                          textAlign: 'center'
                        }} />
                    </View>
                    <View style={{
                      width: 45,
                      height: 45,
                      backgroundColor: StyleVariables.colors.gray100,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TextInput
                        keyboardType='numeric'
                        ref={otp2}
                        onChangeText={(text) => {
                          setOTP({ ...otp, otp2: text });
                          if (text.length > 0) {
                            otp3.current.focus()
                          }
                        }}
                        maxLength={1} placeholder='0' style={{
                          fontFamily: 'sf-pro-reg',
                          fontSize: 24,
                          color: StyleVariables.colors.gray300,
                          textAlign: 'center'
                        }} />
                    </View>
                    <View style={{
                      width: 45,
                      height: 45,
                      backgroundColor: StyleVariables.colors.gray100,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TextInput
                        keyboardType='numeric'
                        onChangeText={(text) => {
                          setOTP({ ...otp, otp3: text });
                          if (text.length > 0) {
                            otp4.current.focus()
                          }
                        }}
                        ref={otp3} maxLength={1} placeholder='0' style={{
                          fontFamily: 'sf-pro-reg',
                          fontSize: 24,
                          color: StyleVariables.colors.gray300,
                          textAlign: 'center'
                        }} />
                    </View>
                    <View style={{
                      width: 45,
                      height: 45,
                      backgroundColor: StyleVariables.colors.gray100,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TextInput
                        keyboardType='numeric'
                        onChangeText={(text) => {
                          setOTP({ ...otp, otp4: text });
                          if (text.length > 0) {
                            otp5.current.focus()
                          }
                        }}
                        ref={otp4} maxLength={1} placeholder='0' style={{
                          fontFamily: 'sf-pro-reg',
                          fontSize: 24,
                          color: StyleVariables.colors.gray300,
                          textAlign: 'center'
                        }} />
                    </View>
                    <View style={{
                      width: 45,
                      height: 45,
                      backgroundColor: StyleVariables.colors.gray100,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TextInput
                        keyboardType='numeric'
                        onChangeText={(text) => {
                          setOTP({ ...otp, otp5: text });
                          if (text.length > 0) {
                            otp6.current.focus()
                          }
                        }}
                        ref={otp5} maxLength={1} placeholder='0' style={{
                          fontFamily: 'sf-pro-reg',
                          fontSize: 24,
                          color: StyleVariables.colors.gray300,
                          textAlign: 'center'
                        }} />
                    </View>
                    <View style={{
                      width: 45,
                      height: 45,
                      backgroundColor: StyleVariables.colors.gray100,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TextInput
                        keyboardType='numeric'
                        onChangeText={(text) => {
                          setOTP({ ...otp, otp6: text });
                        }} ref={otp6} maxLength={1} placeholder='0' style={{
                          fontFamily: 'sf-pro-reg',
                          fontSize: 24,
                          color: StyleVariables.colors.gray300,
                          textAlign: 'center'
                        }} />
                    </View>
                  </View>
                )
              }
            </View>
            <View style={styles.buttonContainer}>
              <CButton title={!showCeleb ? 'Confirm' : 'Start'} btnProps={{
                onPress: !showCeleb ? handleConfirm : handleStart,
              }} />
              {
                !showCeleb && (
                  <Button title='Cancel' onPress={handleCancel} color={StyleVariables.colors.black} />
                )
              }
            </View>
          </View>
        </KeyboardAvoidingView>
      </HideKeyboard >
    </GradientView >
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
    height: 120,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  formContainer: {
    width: '100%',
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
    height: 140
  }
})

export default OTPConfirm