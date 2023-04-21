import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserRegistrationService } from '../services/user-service/user-registration.service';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let userRegistrationService: UserRegistrationService;

  let userDetails = {
    firstName: "Cogjava",
    lastName: "Angular",
    email: "cogjava@gmail.com",
    loginId: "98632",
    password: "12345",
    contactNumber: "7564674555",
    role: "admin"
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    userRegistrationService = fixture.debugElement.injector.get(UserRegistrationService)
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onRegisterClick', () => {
    spyOn(userRegistrationService, 'saveUserRegistrationDetails').and.returnValue(of(userDetails))
    component.registrationForm.setValue({
      firstName: "Cogjava",
    lastName: "Angular",
    email: "cogjava@gmail.com",
    loginId: "98632",
    password: "12345",
    confirmPassword: "12345",
    contactNumber: "7564674555"
    })
    component.onRegisterClick();    
    expect(component.onRegisterClick).toBeDefined();
  });

  it('should call onRegisterReset', () => {
    component.onRegisterReset();
    expect(component.onRegisterReset).toBeDefined();
  });

});
