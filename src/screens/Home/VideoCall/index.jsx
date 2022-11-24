import { Text, View, SafeAreaView, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const VideoCall = () => {
  const img = require('../../../../assets/images/callvideo.png');
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={img}
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            zIndex: 10,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
          }}
        >
          <Text
            style={{
              fontFamily: 'sf-pro-bold',
              fontSize: 30,
              color: 'white',
            }}
          >
            Thai Hoc
          </Text>
          <Text
            style={{
              fontFamily: 'sf-pro-med',
              fontSize: 20,
              color: 'white',
            }}
          >
            Calling...
          </Text>
        </View>
        <View
          style={{
            zIndex: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 50,
            paddingHorizontal: 20
          }}
        >
          <TouchableOpacity style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Ionicons name="mic" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 70,
            height: 70,
            borderRadius: 70,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Ionicons name="ios-call" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Ionicons name="videocam" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default VideoCall;
