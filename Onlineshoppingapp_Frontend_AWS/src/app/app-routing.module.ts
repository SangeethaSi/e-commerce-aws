import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { LoginComponent } from './login/login.component';
import { Role } from './model/role';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './services/auth.guard';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {
    path: '', component: RegistrationFormComponent
  },
  {
    path: 'register', component: RegistrationFormComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'display-products', component: DisplayProductsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: {roles: Role.Admin}
  },
  {
    path: 'update-product',
    component: UpdateProductComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
