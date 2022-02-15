export interface User {
  id: string;
  name: string;
  email: string;
  defaultBoard: string;
}

export interface Card {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  assignee: string;
  labels: string[];
  order?: number;
}

export interface Column {
  id: string;
  name: string;
  order: number;
  cards?: Card[];
}

export interface Board {
  columns: Column[];
}

export interface RootObject {
  user: User;
  board: Board;
}
