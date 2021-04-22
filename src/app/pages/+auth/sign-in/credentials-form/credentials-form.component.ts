import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsFormComponent implements OnInit {
  @Output() signIn = new EventEmitter<{ email: string; password: string }>();

  errorMsg!: string;
  loading = false;

  credentialsForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.credentialsForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { valid, value } = this.credentialsForm;

    if (valid) {
      this.signIn.emit(value);
    }
  }
}
