import { IMessage } from "../models/Message";
import { IInternalServerError } from "../models/ResponseStatus";
import apiService from "./apiService";

const getMessagesOfConversation = async (conversationId: string) => {
  try {
    const res = await apiService.get<IMessage[] | IInternalServerError | any>(`/messages/conversation/${conversationId}`);
    return res;
  } catch (err) {
    return console.log(err);
  }
}

const sendMessageToConversation = async (conversationId: string, message: IMessage) => {
  try {
    const res = await apiService.post<IMessage, any | IInternalServerError>(`/messages/conversation/${conversationId}`, message, {
      'Content-Type': 'multipart/form-data'
    });
    return res;
  } catch (err) {
    return console.log(err);
  }
}

export { getMessagesOfConversation, sendMessageToConversation }