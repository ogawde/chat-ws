export interface Room {
  id: string;
  name: string;
  symbol: string;
  color: string;
}

export interface Message {
  text: string;
  isOwn: boolean;
  username: string;
}

