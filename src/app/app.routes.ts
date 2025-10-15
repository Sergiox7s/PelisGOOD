import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';


export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'category/:id', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'buscar', component: MovieListComponent },
  { path: 'favoritos', component: FavoritesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];