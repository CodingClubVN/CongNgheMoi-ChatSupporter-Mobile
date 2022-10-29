import * as Sharing from 'expo-sharing';

export default async function sharingWithExpoUri(uri) {
  const UTI = 'public.item';
  const shareResult = await Sharing.shareAsync(uri, { UTI });
  return shareResult;
}