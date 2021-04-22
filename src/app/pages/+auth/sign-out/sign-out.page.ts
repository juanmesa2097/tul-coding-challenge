import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@app/@core/structs';
import { UserActions } from '@app/store/user/users.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './sign-out.page.html',
  styleUrls: ['./sign-out.page.scss'],
})
export class SignOutPage implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store
      .dispatch(new UserActions.SignOut())
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.store.dispatch(new Navigate(['/', Path.SignIn]));
        this.router.navigate([Path.SignIn]);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
