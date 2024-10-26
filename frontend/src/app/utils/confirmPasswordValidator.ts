import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ConfirmPasswordValidator: ValidatorFn = (
  control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (password !== passwordConfirm) {
      return { mismatch: true };
    } else {
      return null;
    }
};
