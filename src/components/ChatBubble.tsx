import { IMessage } from "../models/Message"
import { View, Text, Image } from "react-native"
import { IUserA } from "../models/User"
import Animated, { BounceInLeft, BounceInRight } from "react-native-reanimated"
import { forwardRef } from "react"
import StyleVariables from "../../StyleVariables"
import { LinearGradient } from "expo-linear-gradient"

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
  return (<View style={{
    maxWidth: '60%',
    flexDirection: 'row',
    alignItems: 'center'
  }} ref={ref}>
    {
      fromMe ? (
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
            }}>{message.content}</Text>
          </View>
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
  return (
    <View style={{
      width: '100%',
      height: isNextMessageFromSameUser ? 50 : 55,
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