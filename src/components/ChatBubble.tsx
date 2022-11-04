import { IMessage } from "../models/Message"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { IUserA } from "../models/User"
import Animated, { BounceInLeft, BounceInRight } from "react-native-reanimated"
import { forwardRef } from "react"
import StyleVariables from "../../StyleVariables"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { downloadFile, downloadFileAsync } from "../utils/fs"
import sharingWithExpoUri from '../utils/sharing'

const ChatBubble = forwardRef(({ type, message, sender, me, isPreviousMessageFromSameUser, isNextMessageFromSameUser }:
  {
    type: string,
    message: IMessage,
    sender: any,
    me: IUserA,
    isPreviousMessageFromSameUser: boolean,
    isNextMessageFromSameUser: boolean,
  }, ref: any) => {
  const fromMe = message.fromUserId === me._id
  const handleDonwload = async (uri: string) => {
    const download = await downloadFile(encodeURI(uri))
    const res = await downloadFileAsync(download)
    await sharingWithExpoUri(res)
  }
  return (<View style={{
    maxWidth: '60%',
    flexDirection: 'row',
    alignItems: 'center'
  }} ref={ref}>
    {
      fromMe ? (
        message.type === 'text' ? (
          <LinearGradient
            start={[1, -1]}
            end={[-1, 1]}
            // locations={[0.6, 0.7]}
            colors={[StyleVariables.colors.gradientStart, StyleVariables.colors.gradientEnd]}
            style={{
              height: 45,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: StyleVariables.colors.gradientEnd,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 10,
            }}
          >
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontFamily: 'sf-pro-reg'
            }}>{message.content}</Text>
          </LinearGradient>
        ) : message.type === 'image' ? (
          <Image source={{ uri: message.content }} style={{
            height: 200,
            width: 120,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: StyleVariables.colors.gradientEnd,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 10,
          }} />
        ) : message.type === 'video' ? (
          <View style={{
            height: 120,
            width: 200,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: StyleVariables.colors.gradientEnd,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 10,
          }}>
            {
              <Video
                style={{
                  width: 200,
                  height: 120,
                  alignItems: 'center',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  borderBottomLeftRadius: 25,
                  borderBottomRightRadius: 10,
                }}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                isLooping
                source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
              />
            }
          </View>
        ) : message.type === 'file' ? (
          <TouchableOpacity
            onPress={() => handleDonwload(message.content)}
            style={{
              height: 70,
              width: 200,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: StyleVariables.colors.gradientEnd,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 10,
              flexDirection: 'row',
            }}>
            <Ionicons name="file-tray" size={24} color="white" />
            <Text style={{
              color: '#fff',
              marginHorizontal: 10,
              width: 120
            }}>{message.content.split('?')[0].split('/').pop()}</Text>
          </TouchableOpacity>
        ) : null

      ) : (
        <>
          {
            type === 'group' && !isNextMessageFromSameUser && (
              <Image source={{ uri: sender.avatarUrl }} style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                marginRight: 10
              }} />
            )
          }
          {
            message.type === 'text' ? (
              <View style={{
                height: 45,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: StyleVariables.colors.gray200,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 25,
                marginLeft: isNextMessageFromSameUser && type === 'group' ? 40 : 0
              }}>
                <Text style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'sf-pro-reg'
                }}>{message.content[0]}</Text>
              </View>
            ) : message.type === 'image' ? (
              <Image source={{ uri: message.content[0] }} style={{
                height: 200,
                width: 120,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: StyleVariables.colors.gray200,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 25,
                marginLeft: isNextMessageFromSameUser && type === 'group' ? 40 : 0
              }} />
            ) : message.type === 'video' ? (
              <View style={{
                height: 120,
                width: 200,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: StyleVariables.colors.gray200,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 25,
                marginLeft: isNextMessageFromSameUser && type === 'group' ? 40 : 0
              }}>
                {
                  <Video
                    style={{
                      width: 200,
                      height: 120,
                      alignItems: 'center',
                      borderTopLeftRadius: 25,
                      borderTopRightRadius: 25,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 25,
                    }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    isLooping
                    source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                  />
                }
              </View>
            ) : message.type === 'file' ? (
              <TouchableOpacity
                onPress={() => handleDonwload(message.content)}
                style={{
                  height: 70,
                  width: 200,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: StyleVariables.colors.gray200,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 25,
                  marginLeft: isNextMessageFromSameUser && type === 'group' ? 40 : 0,
                  flexDirection: 'row',
                }}>
                <Ionicons name="file-tray" size={24} color="white" />
                <Text style={{
                  color: '#fff',
                  marginHorizontal: 10,
                  width: 120
                }}>{message.content.split('?')[0].split('/').pop()}</Text>
              </TouchableOpacity>
            ) : null
          }
        </>
      )
    }
  </View>)
})

const ChatBubbleAnimated = Animated.createAnimatedComponent(ChatBubble)

const ChatWrapper = ({ type, message, sender, me, isPreviousMessageFromSameUser, isNextMessageFromSameUser }:
  {
    type: string,
    message: IMessage,
    sender: any,
    me: IUserA,
    isPreviousMessageFromSameUser: boolean,
    isNextMessageFromSameUser: boolean,
  }) => {
  const fromMe = message.fromUserId === me._id
  const getHeightByMessageType = () => {
    if (message.type === 'image') {
      return isNextMessageFromSameUser ? 205 : 210
    } else if (message.type === 'video') {
      return isNextMessageFromSameUser ? 125 : 130
    } else if (message.type === 'file') {
      return isNextMessageFromSameUser ? 70 : 75
    }
    return isNextMessageFromSameUser ? 50 : 55
  }
  return (
    <View style={{
      width: '100%',
      height: getHeightByMessageType(),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: fromMe ? 'flex-end' : 'flex-start',
      paddingHorizontal: 15
    }}>
      <ChatBubbleAnimated entering={fromMe ? BounceInRight : BounceInLeft} type={type} message={message} sender={sender} me={me} isPreviousMessageFromSameUser={isPreviousMessageFromSameUser} isNextMessageFromSameUser={isNextMessageFromSameUser} />
    </View>
  )
}

export default ChatWrapper