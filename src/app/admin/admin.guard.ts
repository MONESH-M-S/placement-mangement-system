import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderService } from '../header/header.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  authState$: Observable<boolean>;
  constructor(private headerService: HeaderService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.authState$ = this.headerService.getAuthState();
    return this.authState$;
  }
}
