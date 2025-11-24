// types/service.ts
export interface ServiceContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  mainImageUrl: string;
  smallImageUrl?: string; // Optional small image
  layout: 'left' | 'right'; // 'left' means image on left, 'right' means image on right
  tag: string;
}