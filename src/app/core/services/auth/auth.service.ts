import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private storageKey = 'user';

  isLoggedIn = signal<boolean>(this.hasUser());

  constructor(private http: HttpClient) {}

  private hasUser(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  register(user: User) {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(u => this.saveUser(u))
    );
  }

  login(email: string, password: string) {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        const user = users[0];
        if (!user || user.password !== password) {
          throw new Error('Invalid credentials');
        }
        return user;
      }),
      tap(u => this.saveUser(u))
    );
  }

  private saveUser(user: User) {
    const { password, ...safeUser } = user;

    localStorage.setItem(this.storageKey, JSON.stringify(safeUser));
    localStorage.setItem('user_id', user.id.toString());

    this.isLoggedIn.set(true);
  }

  getCurrentUser() {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }

  isAuthenticated() {
    return this.isLoggedIn(); 
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('user_id');

    this.isLoggedIn.set(false);
  }
}
