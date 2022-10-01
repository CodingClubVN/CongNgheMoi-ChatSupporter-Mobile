import { Ionicons } from '@expo/vector-icons'
import { useEffect } from 'react'
import { SafeAreaView, Image, Text, View, TouchableOpacity } from 'react-native'
import ConversationAvatar from '../../../../components/ConversationAvatar'
import StyleVariables from '../../../../StyleVariables'

const Conversation = ({ route, navigation }: { route: any, navigation: any }) => {
  const { type, conversation, user } = route.params

  useEffect(() => {
    navigation.setOptions({

    })
  }, [])

  return (
    <SafeAreaView style={{
      paddingTop: 20,
      paddingHorizontal: 20
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
    </SafeAreaView>
  )

}

export default Conversation