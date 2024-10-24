import { Injectable } from '@angular/core';
import {LocalStorageService} from '@services/local-storage.service'
import { User } from '@interfaces/user';
import { Register } from '@interfaces/register';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { decodeJwt } from '@utils/decodeJwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl = 'http://localhost:8080/auth';
  private userUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private localService: LocalStorageService,private router: Router) { }

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

  getUserId(): string | null {
    const token = this.localService.getToken();
    if (!token) return null;
    try {
      const decoded: any = decodeJwt(token);
      return decoded.userId;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  getUser(): Observable<any> {
    const userId = this.getUserId();
    return this.http.get<any>(`${this.userUrl}/getUser/${userId}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.localService.getToken()}` })
    }).pipe(
      catchError(this.handleError)
    );
  }



  saveUserData( user: User): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
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
    }).pipe(catchError(this.handleError));
  }

  logout(): void {
    this.localService.destroyToken();
    this.router.navigate(['/']);
  }

  isAuthenticated():boolean {
    let token: string | null = this.localService.getToken();
    if (token == null) {
      return false
    }
    return true
  }
}
