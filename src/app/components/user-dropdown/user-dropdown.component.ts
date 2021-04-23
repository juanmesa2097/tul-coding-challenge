import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@app/@core/structs';
import { UserState } from '@app/store/user/users.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDropdownComponent implements OnInit {
  path = Path;
  open = false;

  constructor(private store: Store, private router: Router) {}

  get userInfo(): { fullName: string; email: string } {
    const user = this.store.selectSnapshot(UserState.user);

    if (user) {
      return {
        fullName: `${user.name} ${user.lastname}`,
        email: user.email,
      };
    }

    return {
      fullName: '',
      email: '',
    };
  }

  ngOnInit(): void {}

  onClickOutside(): void {
    this.open = false;
  }

  onClickOpenPopup(): void {
    this.open = !this.open;
  }

  onClickSignOut(): void {
    this.router.navigate(['/', Path.SignOut]);
  }
}
