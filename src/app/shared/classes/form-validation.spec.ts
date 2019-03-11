import { FormBuilder, FormGroup } from '@angular/forms';

import { FormValidation } from './form-validation';

describe('FormValidation', () => {
  let formValidation: FormValidation;
  let fb: FormBuilder;
  let form: FormGroup;

  beforeEach(() => {
    formValidation = new FormValidation();
    fb = new FormBuilder();
    form = fb.group({
      firstName: ['', []],
      lastName: ['', []]
    });

    formValidation.form = form;
  });

  afterAll(() => (formValidation = null));

  describe('formValues()', () => {
    it('should return the form values', () => {
      const firstName = 'unit';
      const lastName = 'test';
      const expectedObject = {
        firstName: 'unit',
        lastName: 'test'
      };

      form.get('firstName').setValue(firstName);
      form.get('lastName').setValue(lastName);

      expect(formValidation.formValues).toEqual(expectedObject);
    });
  });

  describe('invalidFieldClass()', () => {
    it('should return the correct object for add css classes when field has an error', () => {
      const expectedObject = { error: true };
      spyOn(formValidation, 'isInvalidField').and.returnValue(true);
      expect(formValidation.invalidFieldClass('testField')).toEqual(expectedObject);
    });
  });

  describe('isInvalidField()', () => {
    it('should return true if the field is not valid', () => {
      spyOn(formValidation.form, 'get').and.returnValue({ invalid: true, touched: true });
      expect(formValidation.isInvalidField('testField')).toBeTruthy();
    });
  });

  describe('isInvalidField()', () => {
    it('should return false if the field is valid', () => {
      spyOn(formValidation.form, 'get').and.returnValue({ invalid: false, touched: true });
      expect(formValidation.isInvalidField('testField')).toBeFalsy();
    });
  });
});
