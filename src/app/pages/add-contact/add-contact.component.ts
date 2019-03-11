import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AppRoutePages } from 'src/app/shared/constants/app-route-pages.enum';
import { Contact } from 'src/app/shared/models/contact.model';
import { ContactService } from 'src/app/shared/services/contact.service';
import { FormValidation } from 'src/app/shared/classes/form-validation';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent extends FormValidation implements OnInit {
  public addContactError: boolean;
  public loading: boolean;

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required, Validators]],
      documentExpedition: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public onSubmit(): void {
    const contact = this.formValues as Contact;
    this.loading = true;
    this.addContactError = false;

    this.contactService
      .addContact(contact)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          console.log('El usuario fue agregado satisfactoriamente.');
          this.router.navigate([AppRoutePages.Contacts]);
        },
        () => {
          this.addContactError = true;
          console.error('El usuario no fue añadido al directorio.');
        }
      );
  }
}
