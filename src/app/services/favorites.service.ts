import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  constructor(private authService: AuthService) {}

  private getFavoritesFromStorage(): { [user: string]: Movie[] } {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : {};
  }

  private saveFavoritesToStorage(favorites: { [user: string]: Movie[] }) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  getFavorites(): Movie[] {
    const user = this.authService.getUserEmail();
    if (!user) return [];
    
    const favorites = this.getFavoritesFromStorage();
    return favorites[user] || [];
  }

  addFavorite(movie: Movie) {
    const user = this.authService.getUserEmail();
    if (!user) return;

    let favorites = this.getFavoritesFromStorage();
    if (!favorites[user]) favorites[user] = [];

    if (!favorites[user].find(m => m.id === movie.id)) {
      favorites[user].push(movie);
      this.saveFavoritesToStorage(favorites);
    }
  }

  removeFavorite(movieId: number) {
    const user = this.authService.getUserEmail();
    if (!user) return;

    let favorites = this.getFavoritesFromStorage();
    if (!favorites[user]) return;

    favorites[user] = favorites[user].filter(m => m.id !== movieId);
    this.saveFavoritesToStorage(favorites);
  }

  isFavorite(movieId: number): boolean {
    const user = this.authService.getUserEmail();
    if (!user) return false;

    const favorites = this.getFavoritesFromStorage();
    return favorites[user]?.some((movie: Movie) => movie.id === movieId) || false;
  }

  clearFavorites() {
    const user = this.authService.getUserEmail();
    if (!user) return;

    let favorites = this.getFavoritesFromStorage();
    delete favorites[user];
    this.saveFavoritesToStorage(favorites);
  }
}