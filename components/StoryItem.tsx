import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { View, Text, Pressable, Image } from 'react-native'
import StyleVariables from "../StyleVariables"

const StoryItem = ({ isCreate, user, isViewed, callback }: { isCreate?: boolean, user: any, isViewed?: boolean, callback: Function }) => {
  return (
    <View style={{
      width: 85,
      height: 85,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <LinearGradient colors={[
        isViewed ? '#fff' : StyleVariables.colors.gradientStart,
        isViewed ? '#fff' : StyleVariables.colors.gradientEnd
      ]}
        start={[1, -1]}
        end={[-1, 1]}
        locations={[0.3, 0.7]}
        style={{
          borderRadius: 50
        }}
      >
        <Pressable style={{
          borderRadius: 50,
          borderWidth: isCreate ? 0 : 2,
          borderColor: 'white',
          margin: 2
        }}
          onPress={() => callback()}
        >
          {
            !isCreate ? (
              <Image
                source={{ uri: user.avatar }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                }}
              />
            ) : (
              <LinearGradient
                start={[1, -1]}
                end={[-1, 1]}
                locations={[0.3, 0.7]}
                colors={[
                  StyleVariables.colors.gradientStart,
                  StyleVariables.colors.gradientEnd
                ]}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  paddingLeft: 3,
                  paddingTop: 3
                }}
              >
                <Ionicons name="add-outline" size={30} color="white" />
              </LinearGradient>
            )
          }
        </Pressable>
      </LinearGradient>
      <Text style={{
        fontSize: 12,
        fontFamily: 'sf-pro-reg',
        color: StyleVariables.colors.gray200
      }}>{user.name}</Text>
    </View>
  )
}

export default StoryItem