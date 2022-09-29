export interface FriendRequest {
  id: string,
  fromUser: string,
  toUser: string,
  createdAt: number,
  status: 'pending' | 'accepted' | 'rejected'
}