import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '@services/local-storage.service';
import { Observable, throwError } from'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localService: LocalStorageService, private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.localService.getToken();


    if (token) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${JSON.parse(token).token}`}
      });
    }


    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401||error.status === 403) {
          this.localService.destroyToken();
          this.router.navigate(['/'])
        }
        return throwError(() => new Error(error.message));
      })
    );
    
  }
}

