import { useState } from "react"
import { Text, View, TouchableOpacity, ScrollView } from "react-native"

const CMenuContext = ({children, cButtonStyle, cMenuStyle}:any) => {
  const [showContext, setShowContext] = useState(false)
  return (
    <TouchableOpacity style={{
      position: "relative",
      ...cButtonStyle
    }}>
      {children}
      <ScrollView style={{
        width: 100,
        height: 200,
        position: 'absolute',
        bottom: 0,
        right: 0,
        ...cMenuStyle
      }}>
        {
          showContext && (
            <View style={{
              width: '100%',
              height: 40,
              alignItems: 'center',
              padding: 5
            }}>
              <TouchableOpacity onPress={() => setShowContext(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </ScrollView>
    </TouchableOpacity>  
  )
}

export default CMenuContext