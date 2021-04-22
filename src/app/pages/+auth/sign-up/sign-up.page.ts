import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@app/@core/structs';
import { UserActions } from '@app/store/user/users.actions';
import { User } from '@app/store/user/users.model';
import { Store } from '@ngxs/store';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, OnDestroy {
  path = Path;

  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private store: Store,
    private notificationsService: TuiNotificationsService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  onSignUp(user: User): void {
    this.store
      .dispatch(new UserActions.SignUp(user))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.showSuccessMessage();

        setTimeout(() => this.router.navigate(['/', Path.SignIn]), 2000);
      });
  }

  private showSuccessMessage(): void {
    this.notificationsService
      .show(`La cuenta fue creada exitosamente, ahora puede iniciar sesión`, {
        status: TuiNotification.Success,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
