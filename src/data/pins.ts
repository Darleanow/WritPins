export interface Node {
    Title: string;
    Content: string;
    Author: string;
    Tags: string[];
    LikeScore: number;
    CreationDate: Date;
    LastModified: Date;
    id: number;
  }
  
  const Data: Node[] = [
    {
        Title:'Sample Title',
        Content:'Sample Content',
        Author:'Sample Author',
        Tags:["Sample Tag1","Sample Tag2"],
        LikeScore:2,
        CreationDate:new Date(),
        LastModified:new Date(),
        id:0
    },
    
  ];
  
  export const getNodes = () => Data;
  
  export const getNode = (id: number) => Data.find(m => m.id === id);
  