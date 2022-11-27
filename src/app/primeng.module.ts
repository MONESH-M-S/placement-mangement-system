import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [TableModule, InputTextModule, ButtonModule],
  exports: [TableModule, InputTextModule, ButtonModule],
})
export class PrimengModule {}
