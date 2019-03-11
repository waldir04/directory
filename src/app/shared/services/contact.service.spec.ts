import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { Contact } from '../models/contact.model';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ContactService);
  });

  afterAll(() => {
    httpMock = null;
    service = null;
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('addContact()', () => {
    it('should try to add a contact', () => {
      const contact = { documentNumber: '1234' } as Contact;

      spyOn(service, 'hasGoodScore').and.returnValue(true);
      spyOn(service, 'check').and.returnValue(of({}));
      service.addContact(contact).subscribe();

      const req = httpMock.expectOne('/agregar-contacto');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(contact);
      req.flush({});
    });

    it('should try to add a contact but the contact dont has the minimoun score required', () => {
      const errorExpected = { status: 409 };
      const contact = { documentNumber: '1234' } as Contact;

      spyOn(service, 'hasGoodScore').and.returnValue(false);
      spyOn(service, 'check').and.returnValue(of({}));
      service
        .addContact(contact)
        .subscribe(
          () => {},
          error => expect(error).toEqual(errorExpected)
        );
    });
  });

  describe('check()', () => {
    it('should call checkScore method when the contact passes the two first requirements', () => {
      const contactId = '1234';
      const checkScoreSpy = spyOn(service, 'checkScore').and.returnValue(of({}));
      const checkBackgroundSpy = spyOn(service, 'checkBackground').and.returnValue(of({}));
      const checkIdentificationSpy = spyOn(service, 'checkIdentification').and.returnValue(of({}));

      service.check(contactId).subscribe();

      expect(checkBackgroundSpy).toHaveBeenCalledWith(contactId);
      expect(checkIdentificationSpy).toHaveBeenCalledWith(contactId);
      expect(checkScoreSpy).toHaveBeenCalledWith(contactId);
    });

    it('should throw an error when any of the two first requirements fails', () => {
      const contactId = '1234';
      const error = { status: 409 };
      spyOn(service, 'checkBackground').and.returnValue(throwError(error));
      spyOn(service, 'checkIdentification').and.returnValue(of({}));
      service.check(contactId).subscribe(
        () => {},
        (err) => expect(err).toEqual(error)
      );
    });
  });

  describe('checkBackground()', () => {
    it('should try to check if a contact has criminal records', () => {
      const contactId = '1234';

      service.checkBackground(contactId).subscribe();

      const req = httpMock.expectOne(
        `/comprobar-antecedentes?identification=${contactId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('checkIdentification()', () => {
    it('should try to check if the identification of a contact exists', () => {
      const contactId = '1234';

      service.checkIdentification(contactId).subscribe();

      const req = httpMock.expectOne(
        `/comprobar-identificacion?identification=${contactId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('checkScore()', () => {
    it('should try to check the score of a contact', () => {
      const contactId = '1234';
      const score = 90;

      service.checkScore(contactId).subscribe(
        (data) => expect(data).toEqual(score)
      );

      const req = httpMock.expectOne(
        `/comprobar-puntaje?identification=${contactId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(score);
    });
  });

  describe('get()', () => {
    it('should try to get the contact list', () => {
      const contacts = [{ documentNumber: '123' } as Contact, { documentNumber: '456'} as Contact];

      service.get().subscribe(data => expect(data).toEqual(contacts));

      const req = httpMock.expectOne(`/contactos`);
      expect(req.request.method).toBe('GET');
      req.flush(contacts);
    });
  });

  describe('hasGoodScore()', () => {
    it('should return true when a contact has the score minimoun', () => {
      const score = 60;
      expect(service.hasGoodScore(score)).toBeTruthy();
    });

    it('should return false when a contact has not the score minimoun', () => {
      const score = 20;
      expect(service.hasGoodScore(score)).toBeFalsy();
    });
  });

});
