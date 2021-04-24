import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Path } from '@core/structs';
import { NotFoundModule } from '@pages/_not-found/not-found.module';
import { AuthGuard, NoAuthGuard } from './@core/guards';

const routes: Routes = [
  { path: '', redirectTo: Path.Products, pathMatch: 'full' },

  // Auth
  {
    path: Path.Auth,
    canActivate: [NoAuthGuard],
    children: [
      {
        path: Path.SignIn,
        loadChildren: () =>
          import('@pages/+auth/sign-in/sign-in.module').then(
            (m) => m.SignInModule,
          ),
      },
      {
        path: Path.SignUp,
        loadChildren: () =>
          import('@pages/+auth/sign-up/sign-up.module').then(
            (m) => m.SignUpModule,
          ),
      },
    ],
  },
  {
    path: Path.SignOut,
    loadChildren: () =>
      import('@pages/+auth/sign-out/sign-out.module').then(
        (m) => m.SignOutModule,
      ),
  },
  // App
  {
    path: Path.App,
    canActivate: [AuthGuard],
    children: [
      {
        path: Path.Products,
        loadChildren: () =>
          import('@pages/products/products.module').then(
            (m) => m.ProductsModule,
          ),
      },
      {
        path: Path.Cart,
        loadChildren: () =>
          import('@pages/cart/cart.module').then((m) => m.CartModule),
      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('@pages/_not-found/not-found.module').then(
        (m) => m.NotFoundModule,
      ),
    component: NotFoundModule,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
