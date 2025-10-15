import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // Datos de muestra (en una aplicación real, estos vendrían de una API)
  private categories: Category[] = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Crimen' },
    { id: 3, name: 'Ciencia Ficción' },
    { id: 4, name: 'Aventura' },
    { id: 5, name: 'Acción' },
    { id: 6, name: 'Comedia' },
    { id: 7, name: 'Terror' },
    { id: 8, name: 'Romance' }
  ];

  constructor() { }

  getAllCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getCategoryById(id: number): Observable<Category | undefined> {
    const category = this.categories.find(c => c.id === id);
    return of(category);
  }
}

