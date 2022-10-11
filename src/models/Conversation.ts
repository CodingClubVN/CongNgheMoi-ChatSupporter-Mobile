import { Message } from "./Message";
import { User } from "./User";

export interface Conversation {
  id: string,
  conversationName: string,
  user: User[],
  lastMessage: Message,
  readStatus: string[],
  createdAt: number,
  updatedAt: number
}