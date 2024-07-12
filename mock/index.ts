export type HomeItem = {
  id: number;
  title: string;
  type: string;
  text: string;
  author: string;
  authorAvatar: string;
  image: string;
};

export const homeItems: HomeItem[] = [
  {
    id: 1,
    title: 'Exploring Maui',
    type: 'Blog',
    text: 'We just got back from a trip to Maui, and we had a great time...',
    author: 'Max Lynch',
    authorAvatar: '/img/max.jpg',
    image: '/img/c1.avif',
  },
  {
    id: 2,
    title: 'Arctic Adventures',
    type: 'Blog',
    text: 'Last month we took a trek to the Arctic Circle. The isolation was just what we needed after...',
    author: 'Nathan Chapman',
    authorAvatar: '/img/nathan.jpg',
    image: '/img/c2.avif',
  },
  {
    id: 3,
    title: 'Frolicking in the Faroe Islands',
    type: 'Blog',
    text: 'The Faroe Islands are a North Atlantic archipelago located 320 kilometres (200 mi) north-northwest of Scotland...',
    author: 'Leo Giovanetti',
    authorAvatar: '/img/leo.jpg',
    image: '/img/c3.avif',
  },
];

export type NotificationItem = {
  id: number;
  title: string;
  when: string;
};

export const notifications: NotificationItem[] = [];

export type Settings = {
  enableNotifications: boolean;
};

export const settings: Settings = {
  enableNotifications: true,
};
