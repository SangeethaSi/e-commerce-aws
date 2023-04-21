import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './add-product/add-product.component';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { HttpUtil } from './utils/http-util';

import { RouterModule } from '@angular/router';
import { UserRegistrationService } from './services/user-service/user-registration.service';
import { AuthGuard } from './services/auth.guard';
import { UpdateProductComponent } from './update-product/update-product.component';
import { LogoutResetComponent } from './logout-reset/logout-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginComponent,
    AddProductComponent,
    DisplayProductsComponent,
    UpdateProductComponent,
    LogoutResetComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [UserRegistrationService, HttpUtil],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
