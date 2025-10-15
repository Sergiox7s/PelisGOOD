export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  videoUrl: string;
  year: number;
  duration: string;
  categories: number[]; // IDs de categorías
  rating: number;
}
