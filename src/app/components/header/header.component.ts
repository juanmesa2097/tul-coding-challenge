import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@app/@core/structs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  path = Path;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickSignOut(): void {
    this.router.navigate(['/', Path.SignIn]);
  }
}
