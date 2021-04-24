import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateForm } from '@app/@core/utils';
import { LoginCredentials } from '@app/store/user/users.model';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsFormComponent implements OnInit {
  @Output() signIn = new EventEmitter<LoginCredentials>();

  credentialsForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.credentialsForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { valid, value } = this.credentialsForm;

    validateForm(this.credentialsForm);

    if (valid) {
      this.signIn.emit(value);
    }
  }
}
