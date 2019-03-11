import { FormGroup } from '@angular/forms';

export class FormValidation {
  public form: FormGroup;

  get formValues(): object {
    const formValue = {};

    Object.keys(this.form.controls).forEach(key => {
      formValue[key] = this.form.get(key).value;
    });
    return formValue;
  }

  public invalidFieldClass(field: string): { error: boolean } {
    return {
      error: this.isInvalidField(field)
    };
  }

  public isInvalidField(field: string): boolean {
    return this.form.get(field).invalid && this.form.get(field).touched;
  }
}
