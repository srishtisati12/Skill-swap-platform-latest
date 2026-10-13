export interface SwapRequest {
  id?: string;
  _id?: string;
  senderId: string;
  receiverId: string;
  skillOffered: string;
  skillWanted: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}