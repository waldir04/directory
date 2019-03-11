import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Contact } from 'src/app/shared/models/contact.model';
import { ContactService } from 'src/app/shared/services/contact.service';
import { ContactsComponent } from './contacts.component';
import { StubContactService } from 'src/testing/services/contact.service.stub';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let contactService: ContactService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      providers: [
        {
          provide: ContactService,
          useClass: StubContactService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    contactService = TestBed.get(ContactService);
    component = new ContactsComponent(contactService);
  });

  afterAll(() => {
    contactService = null;
    component = null;
  });

  describe('ngOnInit()', () => {
    it('should load the contact list when the component start', () => {
      const contacts = [
        { documentNumber: '1232' } as Contact,
        { documentNumber: '454545' } as Contact
      ];
      spyOn(contactService, 'get').and.returnValue(of(contacts));
      component.ngOnInit();
      expect(component.contacts).toEqual(contacts);
      expect(component.loading).toBeFalsy();
    });
  });

  describe('fullName()', () => {
    it('should return the correct full name of a contact', () => {
      const contact = { firstName: 'unit', lastName: 'test' } as Contact;
      const expectedName = `${contact.firstName} ${contact.lastName}`;
      expect(component.fullName(contact)).toEqual(expectedName);
    });
  });
});
