import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FilterCategoryPipe } from '../../pipes/filter-category.pipe';
import { Movie } from '../../models/movie';
import { Category } from '../../models/category';
import { switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FilterCategoryPipe],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  currentCategory: Category | null = null;
  selectedCategoryId: number | null = null;


  
  
  private movieService = inject(MovieService);
  private categoryService = inject(CategoryService);
  public route = inject(ActivatedRoute);


  ngOnInit(): void {
  this.route.paramMap
    .pipe(
      switchMap(params => {
        const categoryId = params.get('id');
        this.selectedCategoryId = categoryId ? +categoryId : null;

        return this.route.queryParamMap;
      }),
      switchMap(queryParams => {
        const query = queryParams.get('q');

        if (query) {
          this.currentCategory = null;
          this.selectedCategoryId = null;
          return this.movieService.searchMovies(query);
        }

        if (this.selectedCategoryId !== null) {
          return this.categoryService.getCategoryById(this.selectedCategoryId).pipe(
            tap(category => this.currentCategory = category || null),
            switchMap(() => this.movieService.getAllMovies())
          );
        }

        this.currentCategory = null;
        return this.movieService.getAllMovies();
      })
    )
    .subscribe(movies => {
      this.movies = this.selectedCategoryId
        ? movies.filter(m => m.categories.includes(this.selectedCategoryId!))
        : movies;
    });
}

}