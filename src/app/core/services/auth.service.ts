import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8080/v1/auth';
  private TOKEN = 'token';
  private USER_ROLE: string | null = null;
  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(Router) private router: Router) { }

  login(username: string, password: string): void {
    this.http.post<{ token: string }>(`${this.API_URL}/login`, { username, password }).subscribe((response) => {
      localStorage.setItem(this.TOKEN, response.token);
      this.router.navigate(['/']);
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    return this.USER_ROLE;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN);
    this.router.navigate(['/login']);
  }
}
