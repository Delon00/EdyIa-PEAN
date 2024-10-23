//src/app/core/services
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { decodeJwt } from '@utils/decodeJwt';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private askUrl = 'http://localhost:8080/ask';
  //private baseUrl:string = environmentDev.baseUrl;



  constructor(private http: HttpClient, private router: Router, private userService:UserService) {}

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
    const userId = this.userService.getUserId();
    return this.http.post<any>(`${this.askUrl}/expliq`, { context, question, userId })
    .pipe(catchError(this.handleError));
  }
  

  





  getOne() {}

  getAll() {}

  create() {}

  update() {}

  delete () {}
}
