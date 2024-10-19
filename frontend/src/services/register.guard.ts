import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { BackendService } from './backend.service';

export const registerGuard: CanActivateFn = (route, state) => {
  const backendService = inject(BackendService);
  const router = inject(Router);

  if (backendService.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  } else {
    return true;
  }
  
};


