export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'idle' | 'dnd';
  isBot?: boolean;
  tag?: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  messages: Message[];
  unreadCount?: number;
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  channels: Channel[];
  members: User[];
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  author: User;
  attachments?: Attachment[];
  isDeleted?: boolean;
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'link';
  url: string;
  title?: string;
}