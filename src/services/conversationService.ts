import { IConversationAddUser, IConversationCreate, IConversationCreateResponse, IConversationResponse, IListConversationResponse } from "../models/Conversation"
import { IInternalServerError, ISuccessful } from "../models/ResponseStatus";
import apiService from "./apiService";

export async function addConversation(conversation: IConversationCreate) {
  try {
    const res = await apiService.post<IConversationCreate, IConversationCreateResponse | IInternalServerError>("/conversations", conversation);
    return res;
  } catch (err) {
    return console.log(err);
  }
}
export async function getConversations() {
  try {
    const res = await apiService.get<IListConversationResponse | IInternalServerError>("/conversations");
    return res;
  } catch (err) {
    return console.log(err);
  }
}
export async function addUserToConversation(conversationId: string, users: IConversationAddUser) {
  try {
    const res = await apiService.put<IConversationAddUser, ISuccessful | IInternalServerError>(`/conversations/${conversationId}/users`, users);
    return res;
  } catch (err) {
    return console.log(err);
  }
}
export async function getConversation(conversationId: string) {
  try {
    const res = await apiService.get<IConversationResponse | IInternalServerError>(`/conversations/${conversationId}`);
    return res;
  } catch (err) {
    return console.log(err);
  }
}