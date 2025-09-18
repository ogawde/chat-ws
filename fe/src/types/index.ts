export interface Room {
  id: string;
  name: string;
  symbol: string;
  color: string;
  description?: string;
}

export interface Message {
  text: string;
  isOwn: boolean;
  username: string;
  avatarId?: string;
}

