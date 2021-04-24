import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserState } from '@app/store/user/users.state';
import { Path } from '@core/structs';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  @Select(UserState.isLoggedIn) isLoggedIn$!: Observable<boolean>;

  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate([Path.Products]);
        }

        return !isLoggedIn;
      }),
    );
  }
}
