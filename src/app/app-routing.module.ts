import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './admin/add-company/add-company.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { AdminResolver } from './admin/admin.resolver';
import { CompanyComponent } from './company/company.component';
import { CompanyResolver } from './company/company.resolver';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin/:id',
    component: AdminComponent,
    resolve: { adminData: AdminResolver },
    //canActivate: [AdminGuard],
  },
  {
    path: 'admin/:id/add-company',
    component: AddCompanyComponent,
  },
  {
    path: 'c/:id/edit',
    component: AddCompanyComponent,
    resolve: { companyData: CompanyResolver },
  },
  {
    path: 'company/:id',
    component: CompanyComponent,
    resolve: { companyData: CompanyResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
