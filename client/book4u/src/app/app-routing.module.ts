import { AdminDashboardGuard } from './services/admin-dashboard-guard.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookResolver } from './services/book-resolver.service';
import { BookPageComponent } from './book-page/book-page.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminDashboardGuard],
  },
  {
    path: 'book/:id',
    component: BookPageComponent,
    resolve: { book: BookResolver },
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
