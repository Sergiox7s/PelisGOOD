import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { Movie } from '../../models/movie';
import { Category } from '../../models/category';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  categories: Category[] = [];
  isLoggedIn = false;
  isFavorite = false;
  userName = '';
  safeVideoUrl: SafeResourceUrl | null = null;

 private movieService = inject(MovieService);
  private favoritesService = inject(FavoritesService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.movieService.getMovieById(id).subscribe(movie => {
          this.movie = movie || null;
          if (this.movie) {
            // Convertir la URL del video a una URL segura para el iframe
            this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getEmbedUrl(this.movie.videoUrl));
            
            if (this.userName) {
              this.isFavorite = this.favoritesService.isFavorite(this.movie.id);
            }
          }
        });
      } else {
        this.movie = null;
      }
    });

    this.authService.isLoggedIn$.subscribe(logged => this.isLoggedIn = logged);
    this.authService.userName$.subscribe(name => {
      this.userName = name;
      if (this.movie && this.userName) {
        this.isFavorite = this.favoritesService.isFavorite(this.movie.id);
      }
    });
  }

  toggleFavorite() {
    if (!this.movie || !this.userName) return;
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.movie.id);
    } else {
      this.favoritesService.addFavorite(this.movie);
    }
    this.isFavorite = !this.isFavorite;
  }

  /**
   * Convierte una URL de video normal a una URL de embed para iframe
   * Soporta YouTube, Vimeo y URLs de video directas
   */
  private getEmbedUrl(url: string): string {
    // Verificar si es una URL de YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Verificar si es una URL de Vimeo
    const vimeoRegex = /(?:vimeo\.com\/(?:video\/)?)([0-9]+)/i;
    const vimeoMatch = url.match(vimeoRegex);
    
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    // Si no es YouTube ni Vimeo, devolver la URL original
    // Esto funcionará para URLs de video directas o para servicios
    // que ya proporcionan URLs de embed
    return url;
  }
}