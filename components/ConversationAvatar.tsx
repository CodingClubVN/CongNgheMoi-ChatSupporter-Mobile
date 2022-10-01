import { View, Image } from 'react-native'

const ConversationAvatar = ({ type, urls, size, status }: { type: 'group' | 'direct', urls: string[], size?: number, status?: boolean }) => {
  return type === 'direct' ? (
    <View style={{
      height: size || 60,
      width: size || 60,
      position: 'relative',
    }}>
      <Image source={{ uri: urls[0] }} style={{
        width: size || 60,
        height: size || 60,
        borderRadius: size || 60
      }} />
      {
        status ? (
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
          }} />) : null
      }
    </View>
  ) : (
    <View style={{
      height: size || 60,
      width: size || 60,
      position: 'relative',
    }}>
      <Image source={{ uri: urls[0] }} style={{
        width: size ? size - 15 : 45,
        height: size ? size - 15 : 45,
        borderRadius: size ? size - 15 : 45,
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10000
      }} />
      <Image source={{ uri: urls[1] }} style={{
        width: size ? size - 15 : 45,
        height: size ? size - 15 : 45,
        borderRadius: size ? size - 15 : 45,
        borderWidth: 2,
        borderColor: 'white',
        bottom: 0,
        right: 0,
        position: 'absolute'
      }} />
      {
        status ? (
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
        ) : null
      }

    </View>
  )
}

export default ConversationAvatar