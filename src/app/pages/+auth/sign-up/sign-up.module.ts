import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiNotificationModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SignUpPage } from './sign-up.page';

@NgModule({
  declarations: [SignUpPage, RegisterFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignUpPage,
        data: {
          title: 'Join to Angular Boilerplate',
          description:
            'Start writing your business logic right away without any concern on architecture matters.',
          robots: 'index, follow',
        },
      },
    ]),
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiFieldErrorModule,
    TuiButtonModule,
    TuiLoaderModule,
    TuiNotificationModule,
  ],
})
export class SignUpModule {}
