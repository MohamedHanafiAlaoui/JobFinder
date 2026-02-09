import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { Observable ,map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }


  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl,user)
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?{email}=${email}&password=${password}`)
      .pipe(
        map(users => users.length ? users[0] : null)

      );
  }


}
