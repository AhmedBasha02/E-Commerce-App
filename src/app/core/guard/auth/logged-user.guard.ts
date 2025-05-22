import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../../services/auth/auth-login.service';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  const platform_id = inject(PLATFORM_ID);
  const router = inject(Router);
  const authLoginService = inject(AuthLoginService);

  // if (isPlatformBrowser(platform_id)) {
  //   if (localStorage.getItem('userToken')) {
  //     router.navigate(['/home']);
  //     return false;
  //   }

  //   return true;
  // } else {
  //   return false;
  // }

  //or

  if (authLoginService.isLoggedInUSer()) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
