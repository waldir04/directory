import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'
import { ReactiveFormsModule } from '@angular/forms';

import { AddContactComponent } from './add-contact.component';
import { AddContactRoutingModule } from './add-contact-routing.module';
import { ContactService } from 'src/app/shared/services/contact.service';

@NgModule({
  declarations: [AddContactComponent],
  imports: [
    AddContactRoutingModule,
    CommonModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    ContactService
  ]
})
export class AddContactModule {}
