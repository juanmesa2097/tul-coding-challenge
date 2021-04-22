import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActions } from '@app/store/user/users.actions';
import { LoginCredentials } from '@app/store/user/users.model';
import { Path } from '@core/structs';
import { Store } from '@ngxs/store';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit, OnDestroy {
  returnUrl!: string;
  path = Path;
  subscription = new Subscription();

  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private notificationsService: TuiNotificationsService,
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${Path.Products}`;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  onSignIn(credentials: LoginCredentials): void {
    const sub = this.store
      .dispatch(new UserActions.SignIn(credentials))
      .subscribe(
        (success) => {
          console.log(success);
          this.showSuccessMessage();
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.log(error);
        },
      );

    this.subscription.add(sub);
  }

  private showSuccessMessage(): void {
    this.notificationsService
      .show(`Bienvenida(o) ${'Juan'} 👋👋👋`, {
        status: TuiNotification.Success,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
