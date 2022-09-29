import { User } from "./User";

export interface Message {
  id: string,
  conversationId: string,
  type: string,
  content: string,
  from: User,
  createdAt: number
}