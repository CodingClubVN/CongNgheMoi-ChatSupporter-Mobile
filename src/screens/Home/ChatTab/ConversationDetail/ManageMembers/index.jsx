import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StyleVariables from '../../../../../../StyleVariables';
import { useRoute } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
const ManageMembers = () => {
  const route = useRoute();
  const addModalRef = useRef(null);
  const userModalRef = useRef(null);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const { conversation, users, type } = route.params;
  const handleUserSelect = (user) => {
    setUser(user);
    userModalRef.current?.open();
  };
  const handleAddUser = () => {
    addModalRef.current?.open();
  };
  return (
    <SafeAreaView
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          width: '100%',
          flexGrow: 1,
        }}
      >
        <Text
          style={{
            marginVertical: 10,
            fontFamily: 'sf-pro-bold',
            fontSize: 24,
            paddingHorizontal: 20,
          }}
        >
          Conversation members
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            height: '80%',
            paddingHorizontal: 20,
          }}
        >
          {users.map((u, i) => (
            <TouchableOpacity
              onPress={() => handleUserSelect(u)}
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 70,
                borderRadius: 10,
                backgroundColor: StyleVariables.colors.white,
                padding: 10,
                marginBottom: 10,
              }}
              key={i}
            >
              <Image
                source={{ uri: u.avatarUrl }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 45,
                }}
              />
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: 'space-evenly',
                  height: 45,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'sf-pro-bold',
                    fontSize: 16,
                  }}
                >
                  {u.fullname}
                </Text>
                <Text
                  style={{
                    fontFamily: 'sf-pro-reg',
                    color: StyleVariables.colors.gradientEnd,
                  }}
                >
                  @{u?.account?.username}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={handleAddUser}
        style={{
          width: '95%',
          alignSelf: 'center',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: StyleVariables.colors.gradientEnd,
          borderRadius: 10,
        }}
      >
        <MaterialIcons name="person-add" size={24} color="white" />
        <Text
          style={{
            fontFamily: 'sf-pro-bold',
            fontSize: 22,
            color: '#fff',
            marginLeft: 10,
          }}
        >
          Add member
        </Text>
      </TouchableOpacity>
      <Modalize
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        snapPoint={350}
        ref={userModalRef}
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
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            {user?.account?.username}
          </Text>
          <TouchableOpacity
            style={{
              width: '90%',
              borderRadius: 20,
              backgroundColor: StyleVariables.colors.gray100,
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
              <MaterialIcons
                name="admin-panel-settings"
                size={24}
                color="black"
              />
              <Text
                style={{
                  fontFamily: 'sf-pro-med',
                  fontSize: 16,
                  marginLeft: 20,
                }}
              >
                Promote to admin
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '90%',
              borderRadius: 20,
              backgroundColor: StyleVariables.colors.gray100,
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
              <MaterialIcons name="person" size={24} color="black" />
              <Text
                style={{
                  fontFamily: 'sf-pro-med',
                  fontSize: 16,
                  marginLeft: 20,
                }}
              >
                View profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '90%',
              borderRadius: 20,
              backgroundColor: StyleVariables.colors.gray100,
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
              <MaterialIcons name="person-remove" size={24} color="red" />
              <Text
                style={{
                  fontFamily: 'sf-pro-med',
                  fontSize: 16,
                  marginLeft: 20,
                  color: 'red',
                }}
              >
                Remove
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modalize>
      <Modalize
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        snapPoint={650}
        ref={addModalRef}
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
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            Add member
          </Text>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
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
              placeholder="Search for users ..."
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            height: '80%',
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
              onPress={() => handleUserSelect(users[2])}
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 70,
                borderRadius: 10,
                marginTop:10,
                backgroundColor: StyleVariables.colors.gray100,
                padding: 10,
                marginBottom: 10,
              }}
            >
              <Image
                source={{ uri: users[2].avatarUrl }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 45,
                }}
              />
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: 'space-evenly',
                  height: 45,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'sf-pro-bold',
                    fontSize: 16,
                  }}
                >
                  Duy Hieu
                </Text>
                <Text
                  style={{
                    fontFamily: 'sf-pro-reg',
                    color: StyleVariables.colors.gradientEnd,
                  }}
                >
                  @{users[2]?.account?.username}
                </Text>
              </View>
              <TouchableOpacity style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                backgroundColor: StyleVariables.colors.gradientEnd,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                justifySelf: 'center',
              }}>
              <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
        </ScrollView>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default ManageMembers;
