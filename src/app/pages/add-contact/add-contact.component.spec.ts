import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AddContactComponent } from './add-contact.component';
import { AppRoutePages } from 'src/app/shared/constants/app-route-pages.enum';
import { Contact } from 'src/app/shared/models/contact.model';
import { ContactService } from 'src/app/shared/services/contact.service';
import { StubContactService } from 'src/testing/services/contact.service.stub';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fb: FormBuilder;
  let contactService: ContactService;
  let router: Router;
  let navigateSpy: jasmine.Spy;
  let logSpy: jasmine.Spy;
  let logErrorSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [ AddContactComponent ],
      providers: [
        {
          provide: ContactService,
          useClass: StubContactService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fb = TestBed.get(FormBuilder);
    contactService = TestBed.get(ContactService);
    router = TestBed.get(Router);
    navigateSpy = spyOn(router, 'navigate');
    logSpy = spyOn(console, 'log');
    logErrorSpy = spyOn(console, 'error');
    component = new AddContactComponent(contactService, fb, router);
  });

  afterAll(() => {
    fb = null;
    contactService = null;
    router = null;
    navigateSpy = null;
    component = null;
  });

  describe('ngOnInit()', () => {
    it('should initialize a form group', () => {
      component.ngOnInit();
      expect(component.form).toEqual(jasmine.any(FormGroup));
      expect(component.form.get('firstName')).toEqual(jasmine.any(FormControl));
    });
  });

  describe('onSubmit()', () => {
    let contact: Contact;

    beforeEach(() => {
      contact = { documentNumber: '1232' } as Contact;
      spyOnProperty(component, 'formValues').and.returnValue(contact);
    });

    it('should call addContact method from contactService when try add a new contact', () => {
      const addContactSpy = spyOn(contactService, 'addContact').and.returnValue(of({}));
      component.onSubmit();
      expect(addContactSpy).toHaveBeenCalledWith(contact);
    });

    it('should call console.log method when a contact has been added', () => {
      spyOn(contactService, 'addContact').and.returnValue(of({}));
      component.onSubmit();
      expect(logSpy).toHaveBeenCalledWith(jasmine.any(String));
    });

    it('should redirect to contacts page when a contact has been added', () => {
      spyOn(contactService, 'addContact').and.returnValue(of({}));
      component.onSubmit();
      expect(navigateSpy).toHaveBeenCalledWith([AppRoutePages.Contacts]);
    });

    it('should mark an error when a contact can not be added', () => {
      spyOn(contactService, 'addContact').and.returnValue(throwError({}));
      component.onSubmit();
      expect(component.addContactError).toBeTruthy();
    });

    it('should call console.error method when a contact can not be added', () => {
      spyOn(contactService, 'addContact').and.returnValue(throwError({}));
      component.onSubmit();
      expect(logErrorSpy).toHaveBeenCalledWith(jasmine.any(String));
    });

  });

});
