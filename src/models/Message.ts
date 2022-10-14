import { IUser } from "./User";

export interface IMessage {
  conversationId: string
  createdAt: string
  content: string
  type: string
  fromUserId: string
}