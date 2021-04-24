import { FormGroup } from '@angular/forms';

export function minLengthValidator(context: {
  requiredLength: string;
}): string {
  return `Longitud mínima — ${context.requiredLength}`;
}

export function maxLengthValidator(context: {
  requiredLength: string;
}): string {
  return `Longitud máxima — ${context.requiredLength}`;
}

export function validateForm(form: FormGroup): void {
  for (const control in form.controls) {
    form.controls[control].markAsTouched();
    form.controls[control].markAsDirty();
    form.controls[control].updateValueAndValidity();
  }
}
