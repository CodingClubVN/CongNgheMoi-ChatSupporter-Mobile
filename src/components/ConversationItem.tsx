import { LinearGradient } from "expo-linear-gradient"
import moment from "moment"
import React from "react"
import { View, Text, Image, TouchableOpacity } from 'react-native'
import StyleVariables from "../../StyleVariables"
import ConversationAvatar from "./ConversationAvatar"

const ConversationItem = ({ navigation, type, users, conversation, me }: { navigation: any, type: 'direct' | 'group', users: any[], conversation: any, me: any }) => {
  const handleConversationSelect = () => {
    navigation.navigate('Conversation', {
      users,
      type,
      conversation,
    })
  }

  const getLastMessageSender = (id: string) => {
    return conversation.users.find((user: any) => user.userId === id)
  }

  return (
    <TouchableOpacity onPress={handleConversationSelect}>

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
              <ConversationAvatar type={type} urls={[users[0].avatarUrl]} />
              <View style={{
                height: 60,
                marginLeft: 20,
              }}>
                <Text style={{
                  fontSize: 16,
                  marginBottom: 15,
                  fontWeight: 'bold',
                  fontFamily: 'sf-pro-bold',
                  width: 150,
                }}>{users[0].username}</Text>
                <Text style={{
                  fontSize: 12,
                  color: StyleVariables.colors.gray200,
                  fontFamily: 'sf-pro-reg'
                }}>
                  {conversation.lastMessage?.content || 'No message'}
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
                  {moment(conversation.updatedAt).fromNow()}
                </Text>
                {
                  conversation.readStatus.find((item: any) => item.user === users[0]._id && item.status === 'read') ? (<></>) : (
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
              <ConversationAvatar type={type} urls={users.map(u => u.avatarUrl)} />
              <View style={{
                height: 60,
                marginLeft: 20,
              }}>
                <Text style={{
                  fontSize: 16,
                  marginBottom: 15,
                  fontWeight: 'bold',
                  fontFamily: 'sf-pro-bold',
                  width: 150,
                }}>{conversation.conversationName}</Text>
                <Text style={{
                  fontSize: 12,
                  color: StyleVariables.colors.gray200,
                  fontFamily: 'sf-pro-reg'
                }}>
                  {
                    getLastMessageSender(conversation.lastMessage?.fromUserId) ?
                      `${getLastMessageSender(
                        conversation.lastMessage?.fromUserId).username === me.account.username ?
                        'Me'
                        : getLastMessageSender(
                          conversation.lastMessage?.fromUserId
                        ).username}: ${conversation.lastMessage?.content}`
                      : 'No message'}
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
                  {moment(conversation.updatedAt).fromNow()}
                </Text>
                {
                  conversation.readStatus.find((item: any) => item.user === users[0].name && item.status === 'read') ? (<></>) : (
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