import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const hasToken = sessionStorage.getItem('email');

  if(hasToken){
    return true
  }else{
    router.navigate(['/login'])
  }
  return true;
};
