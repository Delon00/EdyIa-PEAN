import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { BackendService } from './backend.service';
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private backendService: BackendService, private router: Router) {}

  canActivate(): boolean {
    if (this.backendService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
  export const homeGuard: CanActivateFn = (route, state) => {
  return inject(HomeGuard).canActivate();
};
