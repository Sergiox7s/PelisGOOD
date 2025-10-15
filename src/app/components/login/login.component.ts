import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get formValid() {
    return this.email && this.password;
  }

  onSubmit() {
    if (!this.formValid) return;

    try {
      // Obtenemos el nombre del usuario desde el servicio
      const user = this.authService.getUserInfo(this.email);
      this.authService.login(this.email, this.password, user?.name || this.email);
      this.closeModal.emit();
      this.router.navigate(['/movies']);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      alert('Error al iniciar sesión: ' + errorMessage);
    }
  }
}
