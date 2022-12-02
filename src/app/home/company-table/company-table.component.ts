import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  @Input() adminID: string = '';
  company$: Observable<any> = new Observable<any>();
  companyArray: any[] = [];
  isLoading: boolean = false;
  constructor(
    private httpService: HttpService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

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

  deleteConfirmPopup(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.httpService.deleteCompany(id).subscribe((res) => {
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            this.httpService.getAllCoureses();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
        });
      },
      reject: () => {},
    });
  }
}
