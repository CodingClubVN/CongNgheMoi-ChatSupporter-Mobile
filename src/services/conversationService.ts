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
export async function addUserToConversation(conversationId: string, users: string[]): Promise<any> {
  try {
    const res = await apiService.put<any, any>(`/conversations/${conversationId}/add-user`, {
      arrayUserId: users
    });
    return res;
  } catch (err) {
    return console.log(err);
  }
}

export async function removeUserFromConversation(conversationId: string, userId: string): Promise<any> {
  try {
    const res = await apiService.put<any, any>(`/conversations/${conversationId}/users/${userId}/remove-user`, {})
    return res
  } catch (err) {
    return console.log(err)
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