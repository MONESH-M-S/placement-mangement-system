import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  openDialog = false;
  isLoading = false;
  isLoggedIn = false;

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.headerService.getAuthState().subscribe((res) => {
      this.isLoggedIn = res;
    });
  }

  openAdminLoginDialog() {
    this.openDialog = true;
  }

  changeAuthState(value: boolean) {
    this.router.navigate(['/']);
    this.headerService.changeAuthState(value);
  }

  onFormSubmitted(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    const auth = {
      email: form.value.email,
      password: form.value.password,
    };

    this.headerService.adminLogin(auth).subscribe((res) => {
      if (res.user != null) {
        this.openDialog = false;
        this.headerService.changeAuthState(true);
        this.router.navigate([`admin/${res.user.id}`]);
      } else {
        this.headerService.changeAuthState(false);
        this.openDialog = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
      this.isLoading = false;
      form.reset();
    });
  }
}
