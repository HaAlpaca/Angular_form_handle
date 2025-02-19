import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noWhiteSpaceValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value: controlValue } = control;
    const isWhiteSpaceOnly = (controlValue || '').trim().length === 0;
    return isWhiteSpaceOnly ? { noWhiteSpace: true } : null;
  };
}
