import { Image, View, Text, TouchableOpacity } from 'react-native'
import StyleVariables from '../../StyleVariables';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import actions from '../redux/friends/actions';

const CUserResult = ({ user, callback }: any) => {
  const dispatch = useDispatch()
  const handleSendRequest = () => {
    console.log('send request')
    dispatch({
      type: actions.SEND_FRIEND_REQUEST,
      payload: {
        data: {
          toUserId: user._id
        }
      }
    })
  }

  const handleAcceptRequest = () => {
    console.log('accept request')
    dispatch({
      type: actions.ACCEPT_FRIEND_REQUEST,
      payload: {
        data: {
          fromUserId: user._id
        }
      }
    })
  }

  const handleRejectRequest = () => {
    console.log('reject request')
    dispatch({
      type: actions.REJECT_FRIEND_REQUEST,
      payload: {
        data: {
          fromUserId: user._id
        }
      }
    })
  }

  const handleUnfriend = () => {
    console.log('unfriend')
  }

  const handleCancelRequest = () => {
    console.log('cancel request')
    dispatch({
      type: actions.CANCEL_REQUEST,
      payload: {
        data: {
          id: user._id
        },
        callback
      }
    })
  }

  return (
    <View style={{
      width: '100%',
      borderBottomColor: StyleVariables.colors.gray100,
      borderBottomWidth: 0.3,
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      backgroundColor: 'white'
    }}>
      <Image source={{ uri: user.avatarUrl }} style={{
        width: 45,
        height: 45,
        borderRadius: 45,

      }} />
      <View style={{
        flexGrow: 1,
        justifyContent: 'space-evenly',
        height: 45,
        marginLeft: 20
      }}>
        <Text style={{
          fontFamily: 'sf-pro-bold',
          fontSize: 16
        }}>{user.fullname}</Text>
        <Text style={{
          fontFamily: 'sf-pro-reg',
          color: StyleVariables.colors.gradientEnd,
        }}>@{user?.account?.username}</Text>
      </View>
      {
        user.friendRequestStatus === 'none' ? (
          <TouchableOpacity onPress={() => handleSendRequest()} style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Ionicons name="person-add-outline" size={24} color={StyleVariables.colors.gradientStart} />
          </TouchableOpacity>
        ) : user.friendRequestStatus === 'pending' ? (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 100
          }}>
            <TouchableOpacity onPress={() => handleAcceptRequest()} style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ionicons name="checkmark" size={24} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRejectRequest()} style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ionicons name="close" size={24} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
          </View>

        ) :
          user.friendRequestStatus === 'friend' ? (
            <TouchableOpacity onPress={() => handleUnfriend()} style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ionicons name="person-remove-outline" size={24} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
          ) : user.friendRequestStatus === 'request sent' ? (
            <TouchableOpacity onPress={() => handleCancelRequest()} style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ionicons name="close-outline" size={24} color={StyleVariables.colors.gradientStart} />
            </TouchableOpacity>
          ) : null

      }
    </View>
  )
}

export default CUserResult