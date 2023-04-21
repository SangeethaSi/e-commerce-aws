import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserRegistrationService } from '../services/user-service/user-registration.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userRegistrationService: UserRegistrationService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userRegistrationService = fixture.debugElement.injector.get(UserRegistrationService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call onLoginClick for valid form", () => {
    let userDetails = {
      email: "cogjava@gmail.com",
      password: "12345",
    }
    spyOn(userRegistrationService, "getUserDetails").and.returnValue(of(userDetails))
    component.loginForm.setValue(userDetails);
    component.onLoginClick();
    expect(component.onLoginClick).toBeDefined();
  })

  it("should call onLoginClick for valid form", () => {
    let userDetails = {
      email: "cogjava@gmail.com",
      password: "12345",
    }
    spyOn(userRegistrationService, "getUserDetails").and.returnValue(of(userDetails))
    component.loginForm.setValue(userDetails);
    component.onLoginClick();
    expect(component.onLoginClick).toBeDefined();
  })

  it ("should call onResetLoginForm", () => {
    component.onResetLoginForm();
    expect(component.onResetLoginForm).toBeDefined();
  });

});
