import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class StubContactService {
  constructor() {}

  public addContact() {
    return of();
  }

  public check() {
    return of();
  }

  public checkBackground() {
    return of();
  }

  public checkIdentification() {
    return of();
  }

  public checkScore() {
    return of();
  }

  public get() {
    return of();
  }

  public hasGoodScore() {}
}
