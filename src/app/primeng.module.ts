import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  exports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
})
export class PrimengModule {}
