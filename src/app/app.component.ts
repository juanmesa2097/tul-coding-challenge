import { Component, OnInit } from '@angular/core';
import { SeoService } from '@core/services/seo';
import { ThemeService } from '@core/services/theme';
import { Store } from '@ngxs/store';
import { CartActions } from './store/cart/cart.actions';
import { UserState } from './store/user/users.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn!: boolean;

  constructor(
    private seoService: SeoService,
    private themeService: ThemeService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.seoService.init();
    this.themeService.init();

    this.store.select(UserState.isLoggedIn).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;

      // Fetch cart when user is logged
      if (isLoggedIn) {
        const userId = this.store.selectSnapshot(UserState.user)?.id;

        if (userId) {
          this.store.dispatch(new CartActions.Fetch(userId));
        }
      }
    });
  }
}
