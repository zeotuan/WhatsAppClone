/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  ChatRoom:undefined;
  NotFound: undefined;
};

export type MainTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export interface ChatRoom{
  id:string;
  users: Array<User>;
  lastMessage:Message;
}

export interface User{
  id:string;
  name:string;
    imageUri:string;
}

export interface Message{
  id:string;
  content:string;
  createdAt:string;
  from?:User;
}