import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
})
export class CompanyTableComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  company$: Observable<any> = new Observable<any>();
  companyArray: any[] = [];
  isLoading: boolean = false;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.httpService.getAllCoureses();
    this.company$ = this.httpService.getUpdatedCourseList();
    this.company$.subscribe((res) => {
      setTimeout(() => {
        this.companyArray = res;
        this.isLoading = false;
      }, 1000);
    });
  }

  clear(table: Table) {
    table.clear();
  }
}
