import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/store/user/users.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
  @Output() signUp = new EventEmitter<User>();

  loading = false;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      password: [null, [Validators.minLength(6)]],
      passwordConfirm: [null],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { valid, value } = this.registerForm;

    if (valid) {
      this.signUp.emit(value);
    }
  }
}
