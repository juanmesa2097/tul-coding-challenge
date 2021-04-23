import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActions } from '@app/store/user/users.actions';
import { LoginCredentials } from '@app/store/user/users.model';
import { UserState } from '@app/store/user/users.state';
import { Path } from '@core/structs';
import { Select, Store } from '@ngxs/store';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit, OnDestroy {
  @Select(UserState.isLoading) isLoading$!: Observable<boolean>;
  @Select(UserState.error) error$!: Observable<string>;

  path = Path;
  returnUrl!: string;
  status: TuiNotification = TuiNotification.Error;

  private subscription = new Subscription();

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
    this.subscription.unsubscribe();
  }

  onSignIn(credentials: LoginCredentials): void {
    this.store
      .dispatch(new UserActions.SignIn(credentials))
      .subscribe(({ user }) => {
        if (user.accessToken) {
          this.showSuccessMessage();
          this.router.navigate([this.returnUrl]);
        }
      });
  }

  private showSuccessMessage(): void {
    const sub = this.notificationsService
      .show(`Bienvenida(o) ${'Juan'} 👋👋👋`, {
        status: TuiNotification.Success,
      })
      .subscribe();

    this.subscription.add(sub);
  }
}
