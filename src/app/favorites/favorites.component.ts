import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FavoritesService } from '../services/favorites.service';
import { AuthService } from '../services/auth.service';
import { Movie } from '../models/movie';
import { MovieCardComponent } from '../components/movie-card/movie-card.component'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  imports: [NgIf, NgFor, MovieCardComponent] // <-- IMPORTANTE
})
export class FavoritesComponent implements OnInit {
  favorites: Movie[] = [];
  userName = '';
  private favoritesService = inject(FavoritesService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.userName$.subscribe(name => {
      this.userName = name;
      this.favorites = this.favoritesService.getFavorites();
    });
  }
}