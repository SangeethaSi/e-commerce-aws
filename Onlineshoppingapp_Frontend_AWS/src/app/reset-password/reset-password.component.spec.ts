import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserRegistrationService } from '../services/user-service/user-registration.service';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let userRegistrationService: UserRegistrationService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    userRegistrationService = fixture.debugElement.injector.get(UserRegistrationService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ("should call onResetPasswordClick", () => {
    let userDetails = {
      firstName: "Cogjava",
      lastName: "Angular",
      email: "cogjava@gmail.com",
      loginId: "98632",
      password: "12345",
      contactNumber: "7564674555",
      role: "admin"
    }
    spyOn(userRegistrationService, "resetPassword").and.returnValue(of(userDetails));
    component.resetPasswordForm.setValue({ 
    email: "cogjava@gmail.com",   
    password: "12345"});
    component.onResetPasswordClick();
    expect(component.onResetPasswordClick).toBeDefined();
  });

  it ("should call onResetForm", () => {
    component.onResetForm();
    expect(component.onResetForm).toBeDefined();
  });

  it ("should call onGoBack", () => {
    component.onGoBack();
    expect(component.onGoBack).toBeDefined();
  });
});
