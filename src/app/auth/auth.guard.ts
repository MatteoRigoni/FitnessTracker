import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private store: Store) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

  // to use in case of lazy loading to optimize
  // canLoad(route: ActivatedRouteSnapshot) {
  //   if (this.authService.isAuth()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

}
