export type MediaType = 'image' | 'video' | 'iframe' | 'unknown';

export interface CarouselItem {
  mediaUrl: string;
  redirectUrl?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string; // For video previews
}