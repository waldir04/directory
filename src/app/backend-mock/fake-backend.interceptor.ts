import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Contact } from '../shared/models/contact.model';
import { CONTACT_WITH_CRIMINAL_RECORD, CONTACT_IDENTIFIERS } from './config';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return (
      of(null)
        .pipe(
          mergeMap(() => {
            if (
              request.url.endsWith('/comprobar-antecedentes') &&
              request.method === 'GET'
            ) {
              const identifation = request.params.get('identification');
              const filteredUsers = CONTACT_WITH_CRIMINAL_RECORD.filter(
                id => id === identifation
              );

              if (!filteredUsers.length) {
                console.log('antecedentes OK');
                return of(new HttpResponse({ status: 200 }));
              } else {
                console.log('antecedentes FAIL');
                return throwError({ status: 409 });
              }
            }

            if (
              request.url.endsWith('/comprobar-identificacion') &&
              request.method === 'GET'
            ) {
              const identifation = request.params.get('identification');
              const filteredUsers = CONTACT_IDENTIFIERS.filter(
                id => id === identifation
              );

              if (filteredUsers.length) {
                console.log('identificacion OK');
                return of(new HttpResponse({ status: 200 }));
              } else {
                console.log('identificacion FAIL');
                return throwError({ status: 409 });
              }
            }

            if (
              request.url.endsWith('/comprobar-puntaje') &&
              request.method === 'GET'
            ) {
              const score = this.randomScore(0, 100);
              console.log('score', score);
              return of(
                new HttpResponse({
                  status: 200,
                  body: score
                })
              );
            }

            if (
              request.url.endsWith('/agregar-contacto') &&
              request.method === 'POST'
            ) {
              const contact = request.body as Contact;
              this.saveContact(contact);
              return of(
                new HttpResponse({
                  status: 200
                })
              );
            }

            if (
              request.url.endsWith('/contactos') &&
              request.method === 'GET'
            ) {
              const contacts: any[] =
                JSON.parse(sessionStorage.getItem('contacts')) || [];

              return of(
                new HttpResponse({
                  status: 200,
                  body: contacts
                })
              );
            }

            return next.handle(request);
          })
        )

        // call materialize and dematerialize to ensure delay even if an error is thrown
        // (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize())
    );
  }

  private saveContact(contact: Contact): void {
    const contacts = JSON.parse(sessionStorage.getItem('contacts')) || [];
    contacts.push(contact);
    sessionStorage.setItem('contacts', JSON.stringify(contacts));
  }

  private randomScore(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
