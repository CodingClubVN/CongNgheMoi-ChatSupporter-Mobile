import { LinearGradient } from "expo-linear-gradient"
import moment from "moment"
import React from "react"
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from "react-redux"
import StyleVariables from "../../StyleVariables"
import { IMessage } from "../models/Message"
import { IUserA } from "../models/User"
import actions from "../redux/conversations/actions"
import ConversationAvatar from "./ConversationAvatar"

const ConversationItem = ({ navigation, type, users, conversation, me, onSelect }: { onSelect?: any, navigation: any, type: 'direct' | 'group', users: any[], conversation: any, me: any }) => {
  const dispatch = useDispatch()

  const handleConversationSelect = () => {
    dispatch({
      type: actions.GET_CONVERSATION_BY_ID,
      payload: {
        conversationId: conversation._id,
        callback: () => {
          navigation.navigate('ConversationStack', {
            screen: 'Conversation'
          })
        }
      }
    })
  }

  const getLastMessageSender = (id: string) => {
    return conversation.users.find((user: any) => user._id === id)
  }

  const getLastMessageContent = (lastMessage: IMessage, type = 'group') => {
    const notTextTypes = ['image', 'video', 'audio', 'file']
    const from = conversation.lastMessage?.fromUserId === me?._id ? 'Me: ' : `${getLastMessageSender(conversation.lastMessage?.fromUserId)?.account.username}: `
    const content = notTextTypes.includes(lastMessage.type) ? `Sent ${['i', 'a', 'o', 'u'].includes(lastMessage.type.slice(0, 1)) ? 'an ' : 'a'} ${lastMessage.type}` : lastMessage.content[0].length > 30 ? `${lastMessage.content[0]?.slice(0, 30)}...` : lastMessage.content[0]
    return type === 'group' ? from + content : content
  }

  return (
    <TouchableOpacity onPress={onSelect ? onSelect : handleConversationSelect}>

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
              <ConversationAvatar type={type} urls={[users.find(item => item._id !== me._id).avatarUrl]} />
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
                }}>{
                    users.find((user: IUserA) => user._id !== me?._id)?.account
                      ?.username || 'No name'}</Text>
                <Text style={{
                  fontSize: 12,
                  color: StyleVariables.colors.gray200,
                  fontFamily: 'sf-pro-reg'
                }}>
                  {
                    conversation.lastMessage ? getLastMessageContent(conversation.lastMessage, type).slice(0, 40) + '...' : 'No messages yet'
                  }
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
                  width: 200,
                }}>{conversation.conversationName.length > 25 ? `${conversation.conversationName.slice(0, 25)}...` : conversation.conversationName}</Text>
                <Text style={{
                  fontSize: 12,
                  color: StyleVariables.colors.gray200,
                  fontFamily: 'sf-pro-reg'
                }}>
                  {
                    conversation.lastMessage ? getLastMessageContent(conversation.lastMessage).slice(0, 40) + '...' : 'No message'
                  }
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
