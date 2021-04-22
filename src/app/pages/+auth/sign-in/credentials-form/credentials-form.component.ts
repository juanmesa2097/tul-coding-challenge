import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials } from '@app/store/user/users.model';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsFormComponent implements OnInit {
  @Output() signIn = new EventEmitter<LoginCredentials>();

  errorMsg!: string;
  loading = false;

  credentialsForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.credentialsForm = this.fb.group({
      email: [
        'juanmesa2097@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['televition', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { valid, value, controls } = this.credentialsForm;

    for (const control in controls) {
      this.credentialsForm.controls[control].markAsDirty();
      this.credentialsForm.controls[control].updateValueAndValidity();
    }

    if (valid) {
      this.signIn.emit(value);
    }
  }
}
