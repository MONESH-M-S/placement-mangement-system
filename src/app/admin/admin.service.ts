import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  BACKEND_URL = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  addNewCompany(company: FormData) {
    return this.http.post<{ company: any; message: string }>(
      `${this.BACKEND_URL}api/v1/company/`,
      company
    );
  }

  updateFormValue(company: any, id: string) {
    return this.http.put<{ company: any; message: string }>(
      `${this.BACKEND_URL}api/v1/company/${id}`,
      company
    );
  }
}
