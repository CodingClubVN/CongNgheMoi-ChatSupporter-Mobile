/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
import { ColorSchemeName, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import StyleVariables from '../../StyleVariables';
import { RootStackParamList, AuthStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import actions from '../redux/user/actions';

import LoginScreen from '../screens/Auth/Login/Login';
import RegisterScreen from '../screens/Auth/Register/Register';
import CallTab from '../screens/Home/CallTab';
import ChatTab from '../screens/Home/ChatTab';
import Conversation from '../screens/Home/ChatTab/Conversation';
import CreateChat from '../screens/Home/ChatTab/CreateChat';
import SettingTab from '../screens/Home/SettingTab';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme = 'light' }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen name="Conversation" component={Conversation} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  );
}

// Auth pages
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator({ navigation }: any) {
  const dispatch = useDispatch()
  dispatch({
    type: actions.AUTO_LOGIN,
    payload: {
      callback: () => {
        navigation.navigate('Root')
      }
    }
  })
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  return (
    <BottomTab.Navigator
      initialRouteName="ChatTab"
      screenOptions={{
        tabBarActiveTintColor: StyleVariables.colors.gradientStart,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: 50,
          height: 100
        },
        headerTitleAlign: 'left',
        headerTitleAllowFontScaling: true,
        headerStatusBarHeight: 80,
        headerTitleStyle: {
          fontSize: 30,
          fontFamily: 'sf-pro-bold',
          height: 80
        },
      }}>
      <BottomTab.Screen
        name="CallTab"
        component={CallTab}
        options={({ navigation }: RootTabScreenProps<'CallTab'>) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="call-outline" color={color} />,
          headerTitle: 'Calls',
        })}
      />
      <BottomTab.Screen
        name="ChatTab"
        component={ChatTab}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="chatbubble-outline" color={color} />,
          headerTitle: 'Chats',
          headerRight: () => (
            <>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{ height: 80, paddingRight: 20 }}
              >
                <Ionicons name="person-add" size={30} color={StyleVariables.colors.gradientStart} />
              </TouchableOpacity>
              <CreateChat modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </>
          ),
        }}
      />
      <BottomTab.Screen
        name="SettingTab"
        component={SettingTab}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings-outline" color={color} />,
          headerTitle: 'Settings'
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
