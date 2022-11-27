import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  BACKEND_URL = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  adminLogin(auth: { email: string; password: string }) {
    return this.http.post<{ user: any; message: string }>(
      `${this.BACKEND_URL}api/v1/auth/login`,
      auth
    );
  }
}
