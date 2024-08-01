export type Tag = {
  name: string;
  color: string;
};

export type Author = {
  name: string;
  scene_name: string;
};

export type Pin = {
  title: string;
  id: string;
  content: string;
  source: string;
  tags: Tag[];
  creation_date: Date;
  author: Author;
};