import { IUser } from "./User";

export interface IMessage {
  _id?: string;
  conversationId: string
  createdAt: string
  content: string | any[]
  type: string
  description?: string
  fromUserId: string
  status? : string
}