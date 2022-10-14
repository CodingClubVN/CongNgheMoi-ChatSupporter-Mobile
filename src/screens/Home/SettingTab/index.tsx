import React from "react"
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { connect, useDispatch } from "react-redux"

const mapStateToProps = (state: any) => ({
  user: state.user,
})

const SettingTab = ({ user }: any) => {
  const dispatch = useDispatch()
  const defaultAvatar = require('../../../../assets/images/default_avatar.jpeg')
  return (
    <View style={{
      flex: 1,
    }}>
      <TouchableOpacity style={{
        width: '100%',
        height: 100,
        marginVertical: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15
      }}>
        <Image 
          defaultSource={defaultAvatar}
          source={{ 
            uri: user?.photoUrl
          }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 70,
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default connect(mapStateToProps)(SettingTab)