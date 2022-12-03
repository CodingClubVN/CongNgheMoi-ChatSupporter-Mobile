import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CUser from '../../../../components/CUser'
import actions from '../../../../redux/friends/actions'
import conversationActions from '../../../../redux/conversations/actions'

const FriendTab = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<any>()
  const friend = useSelector((state: any) => state.friends.friends)
  const user = useSelector((state: any) => state.user.data)

  const onMessage = (friendId: string, friendUsername: string) => {
    dispatch({
      type: conversationActions.CHECK_CONVERSATION_EXIST,
      payload: {
        userId: friendId,
        currentUserId: user._id,
        conversationName: friendUsername,
        callback: () => {
          navigation.navigate('ConversationStack', {
            screen: 'Conversation',
          })
        },
        callback2: () => {
          dispatch({
            type: conversationActions.CHECK_CONVERSATION_EXIST,
            payload: {
              userId: user._id,
              currentUserId: friendId,
              conversationName: user.username,
              callback: () => {
                navigation.navigate('ConversationStack', {
                  screen: 'Conversation',
                })
              },
            }
          })
        }
      }
    })
  }

  const onCall = () => {

  }

  const onVideo = () => {

  }

  useEffect(() => {
    dispatch({
      type: actions.GET_FRIENDS
    })
  }, [])

  return (
    <ScrollView style={{
      flex: 1,
    }}>
      {
        friend.map((item: any, index: number) => {
          return (
            <CUser onCall={onCall} onMessage={onMessage} onVideo={onVideo} key={index} user={item.friend} />
          )
        })
      }
    </ScrollView>
  )
}

export default FriendTab