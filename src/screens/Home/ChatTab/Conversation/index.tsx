import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { SafeAreaView, TextInput, Image, Text, View, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import Animated from 'react-native-reanimated'
import StyleVariables from '../../../../../StyleVariables'
import ConversationAvatar from '../../../../components/ConversationAvatar'

const Conversation = ({ route, navigation }: { route: any, navigation: any }) => {
  const { type, conversation, user } = route.params

  const handleOutsideKeyboardTouch = () => {
    Keyboard.dismiss()
  }

  useEffect(() => {
    navigation.setOptions({

    })
  }, [])

  return (
    <TouchableWithoutFeedback onPress={handleOutsideKeyboardTouch}>
      <SafeAreaView style={{
        paddingTop: 20,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      }}>


        <View style={{
          width: '100%',
          height: 80,
          borderBottomColor: '#c4c4c4',
          borderBottomWidth: 0.3,
          paddingHorizontal: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 5 }}>
              <Ionicons name="chevron-back" size={35} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
            <ConversationAvatar type={type} urls={user.map((u: { avatar: any }) => u.avatar)} size={50} />
            <View style={{
              marginLeft: 10,
              height: 45,
            }}>
              <Text style={{
                fontFamily: 'sf-pro-bold',
                fontSize: 16,
                marginBottom: 7
              }}>
                {user.length === 1 ? user[0].name : (conversation.title || 'No name')}
              </Text>
              <Text style={{
                fontFamily: 'sf-pro-reg',
                fontSize: 14,
                color: StyleVariables.colors.gray200
              }}>
                {Math.random() > 0.5 ? 'Online' : `Online ${Math.floor(Math.random() * 60)} minutes ago`}
              </Text>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 80,
            justifyContent: 'space-between'
          }}>
            <TouchableOpacity>
              <Ionicons name="call-outline" size={28} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="videocam-outline" size={35} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView keyboardVerticalOffset={20} behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
          flexGrow: 1
        }}>
          <Animated.View style={{
            flexGrow: 1
          }}>
            <Text>Chat messages</Text>
          </Animated.View>
          <View style={{
            maxWidth: '100%',
            height: 50,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 0.3,
            borderTopColor: '#c4c4c4',
            paddingTop: 20
          }}>
            <TouchableOpacity style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              borderWidth: 0.3,
              borderColor: '#c4c4c4',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10
            }}>
              <Ionicons name="camera-outline" size={24} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              borderWidth: 0.3,
              borderColor: '#c4c4c4',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10
            }}>
              <Ionicons name="happy-outline" size={24} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
            <View style={{
              maxWidth: '60%',
              flexGrow: 1,
              height: 40,
              borderRadius: 40,
              borderWidth: 0.3,
              borderColor: '#c4c4c4',
              justifyContent: 'center',
              paddingHorizontal: 15,
              marginRight: 10
            }}>
              <TextInput style={{ width: '100%' }} placeholder="Type a message" />
            </View>
            <TouchableOpacity style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              borderWidth: 0.3,
              borderColor: '#c4c4c4',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 5,
              paddingTop: 2
            }}>
              <Ionicons name="send-outline" size={24} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )

}

export default Conversation