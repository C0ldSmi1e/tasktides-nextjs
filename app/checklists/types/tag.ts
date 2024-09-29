import { Item } from "./item";

export type Tag = {
  id: string;
  name: string;
  items: Item[];
};