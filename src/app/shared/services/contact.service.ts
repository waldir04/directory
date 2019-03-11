import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Contact } from '../models/contact.model';
import { MIN_SCORE_ALLOWED } from '../constants/app-config';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}

  public addContact(contact: Contact): Observable<any> {
    return this.check(contact.documentNumber).pipe(
      mergeMap((score: number) => {
        if (!this.hasGoodScore(score)) {
          return throwError({ status: 409 });
        }

        return this.http.post('/agregar-contacto', contact);
      })
    );
  }

  public check(identification: string): Observable<number> {
    return forkJoin([
      this.checkIdentification(identification),
      this.checkBackground(identification)
    ]).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      mergeMap(() => this.checkScore(identification))
    );
  }

  public checkBackground(identification: string): Observable<any> {
    return this.http.get('/comprobar-antecedentes', {
      params: { identification }
    });
  }

  public checkIdentification(identification: string): Observable<any> {
    return this.http.get('/comprobar-identificacion', {
      params: { identification }
    });
  }

  public checkScore(identification: string): Observable<number> {
    return this.http
      .get('/comprobar-puntaje', {
        params: { identification }
      })
      .pipe(map((score: number) => score));
  }

  public get(): Observable<Contact[]> {
    return this.http
      .get('/contactos')
      .pipe(map((contacts: Contact[]) => contacts));
  }

  public hasGoodScore(score: number): boolean {
    return score >= MIN_SCORE_ALLOWED;
  }
}
