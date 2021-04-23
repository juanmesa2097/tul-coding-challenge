import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '@app/store/user/users.model';
import { validateForm } from '@core/utils';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiNotification } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  @Output() signUp = new EventEmitter<User>();

  destroy$ = new Subject();

  status: TuiNotification = TuiNotification.Error;

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          this.passwordMatchValidator,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.registerForm.controls.password.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.registerForm.controls.passwordConfirm.updateValueAndValidity();
      });
  }

  onSubmit(): void {
    const { valid, value } = this.registerForm;

    validateForm(this.registerForm);

    if (valid) {
      this.signUp.emit(value);
    }
  }

  passwordMatchValidator(control: AbstractControl): Validators | null {
    const password = control.parent?.get('password')?.value;
    if (password === control.value) {
      return null;
    }

    return {
      other: new TuiValidationError(
        'La contraseña y contraseña de confirmación no coinciden',
      ),
    };
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
