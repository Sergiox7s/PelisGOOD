import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';

@Pipe({
  name: 'filterCategory',
  standalone: true
})
export class FilterCategoryPipe implements PipeTransform {
  transform(movies: Movie[], categoryId: number | null): Movie[] {
    if (!categoryId) {
      return movies;
    }
    return movies.filter(movie => movie.categories.includes(categoryId));
  }
}