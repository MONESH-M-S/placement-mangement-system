import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessageService, ConfirmationService } from 'primeng/api';

@NgModule({
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    ToastModule,
    DividerModule,
    DropdownModule,
    FileUploadModule,
    EditorModule,
    AccordionModule,
    ConfirmPopupModule,
  ],
  exports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    ToastModule,
    DividerModule,
    DropdownModule,
    FileUploadModule,
    EditorModule,
    AccordionModule,
    ConfirmPopupModule,
  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimengModule {}
