import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = checkAuthenticationSessionStorage();
  if (!isAuthenticated) {
    return false; //return an observable of false
  }
  return true;

  function checkAuthenticationSessionStorage() {
    //get the access token from the session storage, it's 'access_token' key
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      console.error('No access token found');
      return false;
    }

    return true;
  }
};
