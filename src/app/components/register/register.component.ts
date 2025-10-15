import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  name = '';
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get formValid() {
    return this.email && this.password && this.name;
  }

  onSubmit() {
    if (!this.formValid) return;

    try {
      this.authService.register(this.email, this.password, this.name);
      alert('¡Registro exitoso! Ahora puedes iniciar sesión con tu cuenta.');
      this.closeModal.emit();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      alert('Error al registrarse: ' + errorMessage);
    }
  }
}


