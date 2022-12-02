import { useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ConversationAvatar from '../../../../components/ConversationAvatar';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import StyleVariables from '../../../../../StyleVariables';
const ConversationDetail = () => {
  const editConversationNameRef = useRef(null);
  const me = useSelector((state) => state.user.data);
  const route = useRoute();
  const navigation = useNavigation()
  const { conversation, users, type } = route.params;
  const [conversationName, setConversationName] = useState(conversation.name);

  const onEditConversation = () => {
    editConversationNameRef.current?.open();
  };

  const onManageMembers = () => {
    navigation.navigate('ConversationStack', {
      screen: 'ManageMembers',
      params: {
        conversation,
        users,
        type
      },
    })
  }

  const onEditConversationName = () => {};

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginVertical: 20,
            marginBottom: 50,
          }}
        >
          <ConversationAvatar
            type={type}
            urls={users.map((u) => u.avatarUrl)}
            size={150}
          />
          <Text
            style={{
              fontFamily: 'sf-pro-bold',
              fontSize: 28,
              marginTop: 10,
            }}
          >
            {type === 'group'
              ? conversation.conversationName.length > 25
                ? `${conversation.conversationName.slice(0, 25)}...`
                : conversation.conversationName
              : users.find((user) => user._id !== me?._id)?.account?.username ||
                'No name'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onEditConversation}
          style={{
            width: '90%',
            borderRadius: 20,
            backgroundColor: '#fff',
            alignSelf: 'center',
            padding: 20,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="edit" size={24} color="black" />
            <Text
              style={{
                fontFamily: 'sf-pro-med',
                fontSize: 16,
                marginLeft: 20,
              }}
            >
              Edit conversation name
            </Text>
          </View>
        </TouchableOpacity>
        <Modalize
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          snapPoint={250}
          ref={editConversationNameRef}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              padding: 15,
            }}
          >
            <Text
              style={{
                fontFamily: 'sf-pro-bold',
                fontSize: 22,
                marginBottom: 10,
              }}
            >
              Edit conversation name
            </Text>
            <View
              style={{
                width: '95%',
                height: 40,
                borderRadius: 10,
                backgroundColor: StyleVariables.colors.gray100,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextInput
                autoFocus
                style={{
                  fontSize: 18,
                }}
                placeholder="Conversation name"
                value={conversationName}
                onChangeText={setConversationName}
              />
            </View>
            <TouchableOpacity
              style={{
                width: '95%',
                height: 40,
                borderRadius: 10,
                backgroundColor: StyleVariables.colors.gradientEnd,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onEditConversationName}
            >
              <MaterialIcons name="edit" size={24} color="white" />
              <Text
                style={{
                  fontFamily: 'sf-pro-bold',
                  fontSize: 18,
                  color: '#fff',
                  marginLeft: 5,
                }}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </Modalize>
        <TouchableOpacity
          onPress={onManageMembers}
          style={{
            width: '90%',
            borderRadius: 20,
            backgroundColor: '#fff',
            alignSelf: 'center',
            padding: 20,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="people" size={24} color="black" />
            <Text
              style={{
                fontFamily: 'sf-pro-med',
                fontSize: 16,
                marginLeft: 20,
              }}
            >
              Manage members
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ConversationStack', {
            screen: 'MediaLibrary',
            params: {
              conversation,
              users,
              type
            }
          })}
          style={{
            width: '90%',
            borderRadius: 20,
            backgroundColor: '#fff',
            alignSelf: 'center',
            padding: 20,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="perm-media" size={24} color="black" />
            <Text
              style={{
                fontFamily: 'sf-pro-med',
                fontSize: 16,
                marginLeft: 20,
              }}
            >
              Media & files
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '90%',
            borderRadius: 20,
            backgroundColor: '#fff',
            alignSelf: 'center',
            padding: 20,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="exit-to-app" size={24} color="red" />
            <Text
              style={{
                fontFamily: 'sf-pro-med',
                fontSize: 16,
                marginLeft: 20,
                color: 'red',
              }}
            >
              Leave
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ConversationDetail;
