// @/app/our-framework/components/pillars/types.ts

export interface SubArea {
    title: string;
    description: string;
  }
  
  export interface Pillar {
    id: string;
    title: string;
    description: string;
    subAreas: SubArea[];
    icon?: string; // You can add icons later if needed
  }