// backend.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Register } from '../interfaces/register';
import { Router } from '@angular/router';
import { decodeJwt } from './decodeJwt';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private authUrl = 'http://localhost:8080/auth';
  private userUrl = 'http://localhost:8080/user';
  private askUrl = 'http://localhost:8080/ask';


  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(`Le backend a retourné le code ${error.status}, le corps était:`, error.error);
        errorMessage = error.error.message || errorMessage;
    }
    return throwError(() => ({ status: error.status, message: errorMessage }));
  }

  askQuestion(question: string): Observable<any> {
    return this.http.post<any>(this.askUrl, { question });
  }

  generateQuiz(topic: string, numberOfQuestions: number): Observable<any> {
    return this.http.post<any>(`${this.askUrl}/quiz`, { topic, numberOfQuestions })
    .pipe(catchError(this.handleError));
  }

  generateExpliq(context: string, question: string): Observable<any> {
    return this.http.post<any>(`${this.askUrl}/expliq`, { context, question })
    .pipe(catchError(this.handleError));
  }
  

  

  register(user: Register): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(response => this.saveToken(response.token)),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getUser(): Observable<any> {
    const userId = this.getUserId();
    return this.http.get<any>(`${this.userUrl}/getUser/${userId}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` })
    }).pipe(
      catchError(this.handleError)
    );
  }
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = decodeJwt(token);
      return decoded.userId;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null; 
    }
  }

  saveUserData(token: string, user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }



  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserData(): User | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
