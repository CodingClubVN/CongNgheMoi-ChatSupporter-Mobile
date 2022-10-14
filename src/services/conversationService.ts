import { IConversationAddUser, IConversationCreate, IConversationCreateResponse, IConversationResponse, IListConversationResponse } from "../models/Conversation"
import { IInternalServerError, ISuccessful } from "../models/ResponseStatus";
import apiService from "./apiService";

const conversationService = {
  addConversation: (conversation: IConversationCreate): Promise<IConversationCreateResponse | IInternalServerError> => {
    return apiService.post<IConversationCreate, IConversationCreateResponse | IInternalServerError>("/conversations", conversation);
  },
  getConversations: (): Promise<IListConversationResponse | IInternalServerError> => {
    return apiService.get<IListConversationResponse | IInternalServerError>("/conversations");
  },
  addUserToConversation: (conversationId: string, users: IConversationAddUser): Promise<IInternalServerError | ISuccessful> => {
    return apiService.put<IConversationAddUser, ISuccessful | IInternalServerError>(`/conversations/${conversationId}/users`, users);
  },
  getConversation: (conversationId: string): Promise<IConversationResponse | IInternalServerError> => {
    return apiService.get<IConversationResponse | IInternalServerError>(`/conversations/${conversationId}`);
  }
}

export default conversationService