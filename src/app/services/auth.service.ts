import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string>('');

  isLoggedIn$ = this.loggedIn.asObservable();
  userName$ = this.userName.asObservable();

  constructor() {
    // Cargar el estado del usuario al iniciar
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.loggedIn.next(true);
      this.userName.next(userData.name);
    }
  }

  register(email: string, password: string, name: string) {
    // Cargar usuarios existentes
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[email]) throw new Error('Usuario ya existe');
    
    // Guardar nuevo usuario
    users[email] = {
      password: password,
      name: name
    };
    localStorage.setItem('users', JSON.stringify(users));
    
    // No iniciamos sesión automáticamente
    // El usuario debe hacerlo manualmente
    return true;
  }

  login(email: string, password: string, name?: string) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[email] && users[email].password === password) {
      // Guardar información del usuario
      const user = { 
        email: email,
        name: users[email].name
      };
      localStorage.setItem('user', JSON.stringify(user));
      
      this.loggedIn.next(true);
      this.userName.next(users[email].name);
    } else {
      throw new Error('Credenciales incorrectas');
    }
  }

  getUserInfo(email: string): { name: string } | null {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return { name: user.name || email };
    }
    return null;
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.userName.next('');
  }

  getUserEmail(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).email : null;
  }
}