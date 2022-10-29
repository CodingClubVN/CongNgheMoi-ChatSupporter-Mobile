import * as FileSystem from 'expo-file-system';
import moment from 'moment';

export const downloadFile = async (url, callback) => {
  return FileSystem.createDownloadResumable(url,
    FileSystem.documentDirectory + `${moment.now()}.${url.split('?')[0].split('/').pop().split('.').pop()}`, {
  }, callback)
}

export const fetchDownloadProgress = (downloadProgress, setDownloadState) => {
  const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  setDownloadState(progress);
}

export const downloadFileAsync = async (downloadObject) => {
  try {
    const { uri } = await downloadObject.downloadAsync();
    return uri;
  } catch (e) {
    console.log(e)
  }
}

export const pauseDownloadAsync = async (downloadObject) => {
  try {
    await downloadObject.pauseAsync();
    console.log('Paused download operation, saving for future retrieval');
    AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
  } catch (e) {
    console.error(e);
  }
}

export const resumeDownloadAsync = async (downloadObject) => {
  try {
    const { uri } = await downloadObject.resumeAsync();
    console.log('Finished downloading to ', uri);
  } catch (e) {
    console.error(e);
  }
}

export const resumePausedDownloadAsync = async () => {
  const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
  const downloadSnapshot = JSON.parse(downloadSnapshotJson);
  const downloadResumable = new FileSystem.DownloadResumable(
    downloadSnapshot.url,
    downloadSnapshot.fileUri,
    downloadSnapshot.options,
    callback,
    downloadSnapshot.resumeData
  );

  try {
    const { uri } = await downloadResumable.resumeAsync();
    console.log('Finished downloading to ', uri);
  } catch (e) {
    console.error(e);
  }
}