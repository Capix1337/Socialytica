// app/psychometrics/types/references.ts

export interface BaseReference {
    id: string;
    authors: string;
    year: number;
    title: string;
    pages?: string;
  }
  
  export interface ArticleReference extends BaseReference {
    type?: 'article';
    journal: string;
    volume?: string;
  }
  
  export interface BookReference extends BaseReference {
    type: 'book';
    publisher: string;
  }
  
  export interface BookChapterReference extends BaseReference {
    type: 'bookChapter';
    bookTitle: string;
    editor?: string;
    publisher: string;
    edition?: string;
  }
  
  export type Reference = ArticleReference | BookReference | BookChapterReference;