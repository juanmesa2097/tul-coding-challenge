import { Component, OnInit } from '@angular/core';
import { UserActions } from '@app/store/user/users.actions';
import { Store } from '@ngxs/store';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  onClickSignIn(): void {
    this.store.dispatch(
      new UserActions.SignIn('juanmesa2097@gmail.com', 'televition'),
    );
  }

  onClickSignUp(): void {
    this.store.dispatch(
      new UserActions.SignUp({
        email: 'juanmesa2097@gmail.com',
        password: 'televition',
        firstName: 'Juan David',
        lastName: 'García Mesa',
      }),
    );
  }
}
