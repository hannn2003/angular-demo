import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = 'https://67d255df90e0670699bd1cfa.mockapi.io/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  create(data: User): Observable<User> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getUser(user_id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${user_id}`);
  }

  updateUser(user_id: string, updateData: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user_id}`, updateData);
  }

  deleteUser(user_id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${user_id}`);
  }
}
