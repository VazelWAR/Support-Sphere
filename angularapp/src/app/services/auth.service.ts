

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
 
export const AUTHENTICATED_USER = 'authenticatedUserEmail';
export const TOKEN = 'token';
export const PAGE_ID = 'pageId';
export const USER_ID = 'userId';
export const ROLE = 'role';
export const USER_NAME = 'userName';
 
@Injectable({
  providedIn: 'root'
})
 
export class AuthService {
   
  apiUrl: string = 'http://localhost:8080';
 
  constructor(private readonly http: HttpClient) { }
 
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
 
 
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(
        data => {
          localStorage.setItem(USER_ID, "" + data.user.userId);
          localStorage.setItem(AUTHENTICATED_USER, data.user.email);
          localStorage.setItem(TOKEN, `Bearer ${data.token}`);
          console.log(data.token);
          localStorage.setItem(ROLE, data.user.userRole);
          localStorage.setItem(USER_NAME, data.user.username);
          return data;
        }
      )
    );
  }
 
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
 
  getAllUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/api/`)
  }
 
  getRole(): string {
    return this.getAuthenticatedRole();
  }
 
  isLoggedIn(): boolean {
    let user = localStorage.getItem(AUTHENTICATED_USER);
    return (user != null);
  }
 
  logout(): void { localStorage.clear(); }
 
  isManager(): boolean { return this.getAuthenticatedRole() === 'MANAGER'; }
 
  isClient(): boolean { return this.getAuthenticatedRole() === 'CLIENT'; }
 
 
  getAuthenticatedUserId(): number {
    return parseInt(localStorage.getItem(USER_ID) || "0");
  }
 
  getAuthenticatedUser() {
    return localStorage.getItem(AUTHENTICATED_USER);
  }
 
  getAuthenticatedRole() {
    return localStorage.getItem(ROLE);
  }
 
  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return localStorage.getItem(TOKEN);
  }
 
 
  pageId(): string {
    let pageId = localStorage.getItem(PAGE_ID);
    if (pageId === null) {
      localStorage.setItem(PAGE_ID, 'login');
    }
    return pageId;
  }
 
  setPageId(pageId: string) {
    localStorage.setItem(PAGE_ID, pageId);
  }
 
}
 



