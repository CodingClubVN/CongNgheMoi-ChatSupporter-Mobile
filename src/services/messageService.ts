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

const sendMessageToConversation = async (conversationId: string, message: any) => {
  try {
    const res = await apiService.post<IMessage, any | IInternalServerError>(`/messages/conversation/${conversationId}`, message);
    return res;
  } catch (err) {
    return console.log(err);
  }
}

const sendMediaMessageToConversation = async (conversationId: string, message: any) => {
  try {
    const res = await apiService.postFormData(`/messages/conversation/${conversationId}`, message);
    return res;
  } catch (err) {
    return console.log('err', err);
  }
}

export { getMessagesOfConversation, sendMessageToConversation, sendMediaMessageToConversation };