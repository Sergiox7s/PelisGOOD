import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

// Declarar bootstrap como variable global
declare var bootstrap: any;

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar si el modal ya ha sido mostrado anteriormente
    const hasSeenWelcomeModal = localStorage.getItem('hasSeenWelcomeModal');
    
    // Solo mostrar el modal si el usuario no lo ha visto antes
    if (!hasSeenWelcomeModal) {
      setTimeout(() => {
        const modalElement = document.getElementById('welcomeModal');
        if (modalElement) {
          // Verificar si ya existe una instancia del modal
          let modal = bootstrap.Modal.getInstance(modalElement);
          if (!modal) {
            // Si no existe, crear una nueva instancia
            modal = new bootstrap.Modal(modalElement, {
              backdrop: 'static',
              keyboard: false
            });
          }
          modal.show();
          
          // Guardar en localStorage que el usuario ya ha visto el modal
          localStorage.setItem('hasSeenWelcomeModal', 'true');
        }
      }, 300); // Pequeño retraso para asegurar que el DOM está listo
    }
  }

  closeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
      // Navegar a la lista de películas después de cerrar el modal
      this.router.navigate(['/']);
    }
  }
}
