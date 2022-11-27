import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  openDialog = false;
  isLoading = false;

  constructor(private headerService: HeaderService, private router: Router) {}

  ngOnInit(): void {}

  openAdminLoginDialog() {
    this.openDialog = true;
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
      console.log(res);
      if (res.user != null) {
        this.openDialog = false;
        this.router.navigate([`admin/${res.user.id}`]);
      }
    });
  }
}
