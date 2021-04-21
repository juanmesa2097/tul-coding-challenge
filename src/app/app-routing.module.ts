import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '@core/guards';
import { Path } from '@core/structs';
import { NotFoundModule } from '@pages/_not-found/not-found.module';

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
  // App
  {
    path: Path.Products,
    loadChildren: () =>
      import('@pages/products/products.module').then((m) => m.ProductsModule),
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
