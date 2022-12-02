import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  comapnyType = ['software', 'core'];
  companyDetails: any = {};
  imageDisplay = 'assets/streamlinehq-avatar-network-ux-colors-999.svg';
  companyForm: FormGroup;
  isLoading: boolean = false;
  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.route.queryParams.subscribe((params) => {
      if (params.edit) {
        this.editMode = true;
        this.route.data.subscribe((res) => {
          if (res.companyData.company != null) {
            this.companyDetails = res.companyData.company;
            this._updateFormData(this.companyDetails);
          } else {
            this.location.back();
          }
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onUpload(event: any) {
    const file = event.files[0];
    this.companyForm.patchValue({ company_logo: file });
    this.companyForm.get('company_logo').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  get alumni(): FormArray {
    return this.companyForm.get('alumni') as FormArray;
  }

  newAlumni(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      batch: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  addAlumni() {
    this.alumni.push(this.newAlumni());
  }

  removeAlumni(i: number) {
    this.alumni.removeAt(i);
  }

  onSubmit() {
    if (this.companyForm.invalid) return;
    this.isLoading = true;

    if (this.editMode === true) {
      const companyFormValue = {
        company_name: this.companyForm.value.company_name,
        company_type: this.companyForm.value.company_type,
        company_description: this.companyForm.value.company_description,
        alumni: this.companyForm.value.alumni,
        company_logo: this.companyDetails.company_logo,
      };

      this.adminService
        .updateFormValue(companyFormValue, this.companyDetails.id)
        .subscribe((res) => {
          if (res.company != null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
          setTimeout(() => {
            this.location.back();
            this.isLoading = false;
          }, 3000);
        });
    } else {
      const companyFormValue = new FormData();
      companyFormValue.append(
        'company_name',
        this.companyForm.value.company_name
      );
      companyFormValue.append(
        'company_description',
        this.companyForm.value.company_description
      );
      companyFormValue.append(
        'company_type',
        this.companyForm.value.company_type
      );
      companyFormValue.append('image', this.companyForm.value.company_logo);
      companyFormValue.append(
        'alumni',
        JSON.stringify(this.companyForm.value.alumni)
      );

      this.adminService.addNewCompany(companyFormValue).subscribe((res) => {
        if (res.company != null) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.companyForm.reset();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
        this.isLoading = false;
      });
    }
  }

  private _initForm() {
    this.companyForm = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_type: ['', Validators.required],
      company_logo: '',
      company_description: ['', Validators.required],
      alumni: this.formBuilder.array([this.newAlumni()]),
    });
  }

  private _updateFormData(companyData: any) {
    this.imageDisplay = companyData.company_logo;
    this.companyForm.get('company_name').setValue(companyData.company_name);
    this.companyForm.get('company_type').setValue(companyData.company_type);
    this.companyForm
      .get('company_description')
      .setValue(companyData.company_description);
    this.companyForm.get('alumni').setValue(companyData.alumni_detail);
  }
}
