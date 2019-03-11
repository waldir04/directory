import { Component, OnInit } from '@angular/core';

import { ContactService } from 'src/app/shared/services/contact.service';
import { Contact } from 'src/app/shared/models/contact.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public contacts: Contact[];
  public loading: boolean;

  constructor(private contactService: ContactService) {
    this.contacts = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this.contactService
      .get()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((contacts: Contact[]) => (this.contacts = contacts));
  }

  public fullName(contact: Contact): string {
    return `${contact.firstName} ${contact.lastName}`;
  }
}
