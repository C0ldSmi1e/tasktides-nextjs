import { Tag } from "./tag";

export type Item = {
  id: string;
  name: string;
  description: string | null;
  dueDate: Date | null;
  isDone: boolean;
  isImportant: boolean;
  tags: Tag[];
};