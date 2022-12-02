import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyResolver implements Resolve<any> {
  BACKEND_URL = environment.BACKEND_URL;
  constructor(private http: HttpClient, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (route.params['id']) {
      return this.http.get<{ user: any; message: string }>(
        `${this.BACKEND_URL}api/v1/company/${route.params.id}`
      );
    } else {
      this.router.navigate(['/']);
    }
  }
}
