import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import StyleVariables from "../../../../../../StyleVariables";
import { useRoute } from "@react-navigation/native";
import { useMemo, useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../redux/conversations/actions";
const ManageMembers = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const addModalRef = useRef(null);
  const userModalRef = useRef(null);
  const friends = useSelector((state) => state.friends.friends);
  const [searchResult, setSearchResult] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const me = useSelector((state) => state.user.data);
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState(route.params.conversation);
  const { users, type } = route.params;
  const role = useMemo(() => {
    return conversation.users.find((u) => u._id === me._id).account.role;
  }, [conversation.users]);
  const handleUserSelect = (user) => {
    setUser(user);
    userModalRef.current?.open();
  };
  const handleAddUser = () => {
    addModalRef.current?.open();
  };
  const usersToSelection = (usrs) => {
    const listExisting = users.map((u) => u._id);
    if (usrs && usrs.length) {
      return usrs.filter((u) => !listExisting.includes(u.friend._id));
    }
    return [];
  };
  const handleUserAdd = (user) => {
    dispatch({
      type: actions.ADD_USER_CONVERSATION,
      payload: {
        conversationId: conversation._id,
        users: [user._id],
      },
    });
  };
  useEffect(() => {
    if (searchInput.length > 0) {
      console.log(friends);
      const result = friends.filter((friend) =>
        friend.friend.account.username
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
      setSearchResult(result);
    }
  }, [searchInput]);
  useEffect(() => {
    setData(usersToSelection(searchResult));
  }, [searchResult]);
  return (
    <SafeAreaView
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "100%",
          flexGrow: 1,
        }}
      >
        <Text
          style={{
            marginVertical: 10,
            fontFamily: "sf-pro-bold",
            fontSize: 24,
            paddingHorizontal: 20,
          }}
        >
          Conversation members
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: "100%",
            height: "80%",
            paddingHorizontal: 20,
          }}
        >
          {users.map((u, i) => (
            <TouchableOpacity
              onPress={() => handleUserSelect(u)}
              style={{
                flexDirection: "row",
                width: "100%",
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
                  justifyContent: "space-evenly",
                  height: 45,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: "sf-pro-bold",
                    fontSize: 16,
                  }}
                >
                  @{u?.account?.username}
                </Text>
                <Text
                  style={{
                    fontFamily: "sf-pro-reg",
                    color: StyleVariables.colors.gradientEnd,
                  }}
                >
                  {u?.account?.role}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        disabled={role === "member"}
        onPress={handleAddUser}
        style={{
          width: "95%",
          alignSelf: "center",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor:
            role !== "member"
              ? StyleVariables.colors.gradientEnd
              : StyleVariables.colors.gray200,
          borderRadius: 10,
        }}
      >
        <MaterialIcons name="person-add" size={24} color="white" />
        <Text
          style={{
            fontFamily: "sf-pro-bold",
            fontSize: 22,
            color: "#fff",
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
            width: "100%",
            height: "100%",
            padding: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "sf-pro-bold",
              fontSize: 22,
              marginBottom: 10,
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            {user?.account?.username}
          </Text>
          <TouchableOpacity
            disabled={role === "member"}
            style={{
              width: "90%",
              borderRadius: 20,
              backgroundColor: StyleVariables.colors.gray100,
              alignSelf: "center",
              padding: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="admin-panel-settings"
                size={24}
                color={
                  role === "member" ? StyleVariables.colors.gray200 : "black"
                }
              />
              <Text
                style={{
                  fontFamily: "sf-pro-med",
                  fontSize: 16,
                  marginLeft: 20,
                  color:
                    role === "member" ? StyleVariables.colors.gray200 : "black",
                }}
              >
                Promote to admin
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "90%",
              borderRadius: 20,
              backgroundColor: StyleVariables.colors.gray100,
              alignSelf: "center",
              padding: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="person" size={24} color="black" />
              <Text
                style={{
                  fontFamily: "sf-pro-med",
                  fontSize: 16,
                  marginLeft: 20,
                }}
              >
                View profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={role === "member"}
            style={{
              width: "90%",
              borderRadius: 20,
              backgroundColor: StyleVariables.colors.gray100,
              alignSelf: "center",
              padding: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="person-remove"
                size={24}
                color={
                  role === "member" ? StyleVariables.colors.gray200 : "red"
                }
              />
              <Text
                style={{
                  fontFamily: "sf-pro-med",
                  fontSize: 16,
                  marginLeft: 20,
                  color:
                    role === "member" ? StyleVariables.colors.gray200 : "red",
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
            width: "100%",
            height: "100%",
            padding: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "sf-pro-bold",
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
              width: "90%",
              alignSelf: "center",
              height: 40,
              borderRadius: 10,
              backgroundColor: StyleVariables.colors.gray100,
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              autoFocus
              style={{
                fontSize: 18,
              }}
              placeholder="Search for users ..."
              value={searchInput}
              onChangeText={setSearchInput}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: "100%",
              height: "80%",
              paddingHorizontal: 20,
            }}
          >
            {data?.map((u, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleUserSelect(u.friend)}
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: 70,
                    borderRadius: 10,
                    marginTop: 10,
                    backgroundColor: StyleVariables.colors.gray100,
                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{ uri: u.friend.avatarUrl }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 45,
                    }}
                  />
                  <View
                    style={{
                      flexGrow: 1,
                      justifyContent: "space-evenly",
                      height: 45,
                      marginLeft: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "sf-pro-bold",
                        fontSize: 16,
                      }}
                    >
                      {u.friend.fullname}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "sf-pro-reg",
                        color: StyleVariables.colors.gradientEnd,
                      }}
                    >
                      @{u.friend.account?.username}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleUserAdd(u.friend)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 40,
                      backgroundColor: StyleVariables.colors.gradientEnd,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  >
                    <MaterialIcons name="add" size={24} color="white" />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default ManageMembers;
