export type Tag = {
  name: string;
  color: string;
};

export type Date = {
  date: string;
};

export type Pin = {
  title: string;
  id: string;
  content: string;
  source: string;
  tags: Tag[];
  creation_date: Date[];
};

export type PinList = {
  name: string;
  id: string;
  pin?: Pin[];
};

// Some fake lists
export const lists: PinList[] = [
  {
    name: 'TestList',
    id: '1',
    pin: [
      {
        title: 'TestPin',
        id: '1',
        content: 'TestContent',
        source: 'TestSource',
        tags: [
          {
            name: 'TestTag',
            color: 'TestColor',
          },
        ],
        creation_date: [
          {
            date: 'TestDate',
          },
        ],
      },
      {
        title: 'TestPin2',
        id: '2',
        content: 'TestContent2',
        source: 'TestSource2',
        tags: [
          {
            name: 'TestTag2',
            color: 'TestColor2',
          },
        ],
        creation_date: [
          {
            date: 'TestDate2',
          },
        ],
      },
    ],
  },
];
