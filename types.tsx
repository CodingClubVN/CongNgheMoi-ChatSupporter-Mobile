/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Profile: undefined;
  ConversationStack: NavigatorScreenParams<ChatStackParamList> | undefined;
  VideoCall: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  CallTab: undefined,
  ChatTab: undefined,
  SettingTabStack: NavigatorScreenParams<SettingTabParamList> | undefined,
  ContactTab: NavigatorScreenParams<ContactTabParamList> | undefined,
};

export type ChatStackParamList = {
  Conversation: undefined,
  ConversationDetail: undefined,
  ManageMembers: undefined,
  MediaLibrary: undefined,
}

export type ContactTabParamList = {
  FriendTab: undefined,
  RequestSent: undefined,
  RequestReceived: undefined,
  Contact: undefined,
}

export type SettingTabParamList = {
  SettingTab: undefined,
  Profile: undefined,
  EditProfile: undefined,
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterConfirm: undefined;
  OTPConfirm: undefined
}
