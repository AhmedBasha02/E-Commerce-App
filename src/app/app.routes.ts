import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { loggedUserGuard } from './core/guard/auth/logged-user.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'login',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'forget-password',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent
          ),
      },
    ],
  },
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./core/pages/login/login.component').then(
  //       (c) => c.LoginComponent
  //     ),
  // },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/brands/brands.component').then(
        (c) => c.BrandsComponent
      ),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/pages/cart/component/cart-list/cart-list.component'
      ).then((c) => c.CartListComponent),
  },

  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./features/pages/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent
      ),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
