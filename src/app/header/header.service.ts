import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  BACKEND_URL = environment.BACKEND_URL;
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  adminLogin(auth: { email: string; password: string }) {
    return this.http.post<{ user: any; message: string }>(
      `${this.BACKEND_URL}api/v1/auth/login`,
      auth
    );
  }

  changeAuthState(value: boolean) {
    this.isLoggedIn.next(value);
  }

  getAuthState() {
    return this.isLoggedIn.asObservable();
  }
}
