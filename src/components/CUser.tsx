import { View, TouchableOpacity, Text, Image } from "react-native"
import StyleVariables from "../../StyleVariables"
import { Ionicons } from "@expo/vector-icons"

const CUser = ({ user, onMessage, onCall, onVideo }: any) => {
  return (
    <View style={{
      width: '100%',
      borderBottomColor: StyleVariables.colors.gray100,
      borderBottomWidth: 0.3,
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      justifyContent: 'space-between'
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
      <TouchableOpacity onPress={() => onCall()} style={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Ionicons name="call-outline" size={24} color={StyleVariables.colors.gradientStart} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onVideo()} style={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Ionicons name="videocam-outline" size={24} color={StyleVariables.colors.gradientStart} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onMessage()} style={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Ionicons name="chatbubble-outline" size={24} color={StyleVariables.colors.gradientStart} />
      </TouchableOpacity>
    </View>
  )
}

export default CUser