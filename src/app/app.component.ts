import { Component, OnInit } from '@angular/core';
import { SeoService } from '@core/services/seo';
import { ThemeService } from '@core/services/theme';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from './store/user/users.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @Select(UserState.isLoggedIn) isLoggedIn$!: Observable<boolean>;

  constructor(
    private seoService: SeoService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.seoService.init();
    this.themeService.init();
  }
}
