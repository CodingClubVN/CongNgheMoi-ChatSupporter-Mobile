/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '../../types';


const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          CallTab: 'call',
          ChatTab: 'chat',
          SettingTabStack: {
            screens: {
              SettingTab: 'settings',
              Profile: 'profile',
              EditProfile: 'edit-profile',
            }
          },
          ContactTab: {
            screens: {
              ContactTabScreen: 'contact',
              RequestSentScreen: 'friend-request',
              RequestReceivedScreen: 'friend-request-received',
            },
          }
        },
      },
      Modal: 'modal',
      NotFound: '*',
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
          RegisterConfirm: 'registerConfirm',
          OTPConfirm: 'otpConfirm',
        }
      }
    },
  },
};

export default linking;
