import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private backendService: BackendService, private router: Router) {}

  canActivate(): boolean {
    if (this.backendService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate();
};

