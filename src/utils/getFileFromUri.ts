import moment from "moment";

export default async function getFileFromUri(uri: string) {
  const fileType = uri.split(".").pop();
  const blob = await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const file = new File([blob], `${moment.now()}.${fileType}`, {
    type: blob.type,
  });

  return file
}