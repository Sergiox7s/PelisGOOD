import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, LoginComponent, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories: Category[] = [];
  searchTerm: string = '';
  isLoggedIn = false;
  userName = '';
  isModalOpen = false;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService
  ) {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (!event.url.startsWith('/buscar')) {
          this.searchTerm = '';
          if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
          }
        }
      });

    this.authService.isLoggedIn$.subscribe(logged => this.isLoggedIn = logged);
    this.authService.userName$.subscribe(name => this.userName = name);
  }

  ngOnInit(): void {
  }

  register() {
    // Simulación rápida: en una app real mostrarías un formulario
    try {
      this.authService.register('demo@email.com', '1234', 'Demo');
      alert('Usuario registrado y logueado');
    } catch (e) {
      alert('El usuario ya existe');
    }
  }

  login() {
    // Aquí deberías mostrar un modal o formulario real
    try {
      this.authService.login('demo@email.com', '1234', 'Demo');
    } catch (e) {
      alert('Credenciales incorrectas o usuario no registrado');
    }
  }

  logout() {
    this.authService.logout();
  }

  closeModal() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    if (loginModal) {
      const modal = bootstrap.Modal.getInstance(loginModal);
      if (modal) {
        modal.hide();
      }
    }
    if (registerModal) {
      const modal = bootstrap.Modal.getInstance(registerModal);
      if (modal) {
        modal.hide();
      }
    }
  }

  trackById(index: number, category: Category): number {
    return category.id;
  }

  onSearch(event: Event): void {
    event.preventDefault();
    const query = this.searchTerm.trim();
    if (query) {
      this.router.navigate(['/buscar'], { queryParams: { q: query } });
    }
  }
}