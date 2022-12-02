import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  BACKEND_URL = environment.BACKEND_URL;
  allCompany$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {}

  getAllCoureses() {
    this.http
      .get<{ companies: string; message: string }>(
        `${this.BACKEND_URL}api/v1/company/`
      )
      .subscribe((res) => {
        if (res.companies.length > 1) {
          this.allCompany$.next(res.companies);
        }
      });
  }

  getUpdatedCourseList() {
    return this.allCompany$.asObservable();
  }

  deleteCompany(companyId: string) {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.BACKEND_URL}api/v1/company/${companyId}`
    );
  }
}
