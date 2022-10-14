import { IMessage } from "./Message";
import { IUser } from "./User";

export interface IConversation {
  _id: string,
  conversationName: string
  users: IUser[]
  lastMessage: IMessage
  readStatus: string[]
  createdAt: number
  updatedAt: number
}

export interface IConversationResponse {
  conversationName: string
  arrayUserId: string[]
}

export interface IConversationCreate extends IConversationResponse {

}

export interface IConversationCreateResponse {
  conversationId: string
}

export interface IConversationAddUser {
  arrayUserId: string[]
}

export interface IListConversationResponse {
  total: number
  data: IConversationResponse
}