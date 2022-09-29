import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { View, Text, Image, TouchableOpacity } from 'react-native'
import StyleVariables from "../StyleVariables"

const ConversationItem = ({ type, user, conversation }: { type: 'direct' | 'group', user: any[], conversation: any }) => {
  return (
    <TouchableOpacity>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        height: 100,
        borderBottomWidth: 0.3,
        borderBottomColor: StyleVariables.colors.gray100
      }}>
        {
          type === 'direct' ? (
            <>
              <View style={{
                height: 60,
                width: 60,
                position: 'relative',
              }}>
                <Image source={{ uri: user[0].avatar }} style={{
                  width: 60,
                  height: 60,
                  borderRadius: 60
                }} />
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  backgroundColor: 'green',
                  borderWidth: 2,
                  borderColor: 'white'
                }} />
              </View>
              <View style={{
                height: 60,
                marginLeft: 20,
              }}>
                <Text style={{
                  fontSize: 16,
                  marginBottom: 15,
                  fontWeight: 'bold',
                  fontFamily: 'sf-pro-bold'
                }}>{user[0].name}</Text>
                <Text style={{
                  fontSize: 12,
                  color: StyleVariables.colors.gray200,
                  fontFamily: 'sf-pro-reg'
                }}>
                  {conversation.lastMessage || 'No message'}
                </Text>
              </View>
              <View style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'space-evenly',
                height: 50
              }}>
                <Text style={{
                  fontSize: 12,
                  color: StyleVariables.colors.gray200,
                  fontFamily: 'sf-pro-reg'
                }}>
                  {conversation.lastMessageTime}
                </Text>
                {
                  conversation.readStatus.find((item: any) => item.user === user[0].name && item.status === 'read') ? (<></>) : (
                    <LinearGradient
                      start={[1, -1]}
                      end={[-1, 1]}
                      locations={[0.3, 0.7]}
                      colors={[
                        StyleVariables.colors.gradientStart,
                        StyleVariables.colors.gradientEnd,
                      ]}
                      style={{
                        width: 15,
                        height: 15,
                        borderRadius: 15,
                      }} />
                  )
                }
              </View>
            </>
          ) : (
            <>
              <View style={{
                height: 60,
                width: 60,
                position: 'relative',
              }}>
                <Image source={{ uri: user[0].avatar }} style={{
                  width: 45,
                  height: 45,
                  borderRadius: 45,
                  borderWidth: 2,
                  borderColor: 'white',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 10000
                }} />
                <Image source={{ uri: user[1].avatar }} style={{
                  width: 45,
                  height: 45,
                  borderRadius: 45,
                  borderWidth: 2,
                  borderColor: 'white',
                  bottom: 0,
                  right: 0,
                  position: 'absolute'
                }} />
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  backgroundColor: 'green',
                  borderWidth: 2,
                  borderColor: 'white'
                }} />
              </View>
              <View style={{
                height: 60,
                marginLeft: 20,
              }}>
                <Text style={{
                  fontSize: 16,
                  marginBottom: 15,
                  fontWeight: 'bold',
                  fontFamily: 'sf-pro-bold'
                }}>{user[0].name}</Text>
                <Text style={{
                  fontSize: 12,
                  color: StyleVariables.colors.gray200,
                  fontFamily: 'sf-pro-reg'
                }}>
                  {conversation.lastMessageSender === user[0].name ? 'Me: ' : conversation.lastMessageSender + ': '}{conversation.lastMessage || 'No message'}
                </Text>
              </View>
              <View style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'space-evenly',
                height: 50
              }}>
                <Text style={{
                  fontSize: 12,
                  color: StyleVariables.colors.gray200,
                  fontFamily: 'sf-pro-reg'
                }}>
                  {conversation.lastMessageTime}
                </Text>
                {
                  conversation.readStatus.find((item: any) => item.user === user[0].name && item.status === 'read') ? (<></>) : (
                    <LinearGradient
                      start={[1, -1]}
                      end={[-1, 1]}
                      locations={[0.3, 0.7]}
                      colors={[
                        StyleVariables.colors.gradientStart,
                        StyleVariables.colors.gradientEnd,
                      ]}
                      style={{
                        width: 15,
                        height: 15,
                        borderRadius: 15,
                      }} />
                  )
                }
              </View>
            </>
          )
        }
      </View>
    </TouchableOpacity>
  )
}

export default ConversationItem