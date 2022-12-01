import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  comapnyType = ['Software', 'Core'];
  imageDisplay = 'assets/streamlinehq-avatar-network-ux-colors-999.svg';
  companyForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  onUpload(event: any) {
    const file = event.files[0];
    this.companyForm.patchValue({ comapny_logo: file });
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
    console.log(this.alumni.value);
  }

  removeAlumni(i: number) {
    this.alumni.removeAt(i);
  }

  onSubmit() {
    console.log(this.companyForm);
    if (this.companyForm.invalid) return;

    this.isLoading = true;

    const companyFormValue = new FormData();
    companyFormValue.append(
      'company_name',
      this.companyForm.get('company_name').value
    );
    companyFormValue.append(
      'company_description',
      this.companyForm.get('company_description').value
    );
    companyFormValue.append(
      'company_type',
      this.companyForm.get('company_type').value
    );
    companyFormValue.append(
      'company_logo',
      this.companyForm.get('company_logo').value
    );
    companyFormValue.append('alumni', this.companyForm.get('alumni').value);

    this.adminService.addNewCompany(companyFormValue).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
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
}
