import { Item } from "./item";

export type Tag = {
  id: string;
  name: string;
  items: Item[];
};

export type TagOption = {
  value: string;
  label: string;
  __isNew__: boolean | undefined;
};