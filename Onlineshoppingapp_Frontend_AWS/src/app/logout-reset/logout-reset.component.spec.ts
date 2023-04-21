import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LogoutResetComponent } from './logout-reset.component';

describe('LogoutResetComponent', () => {
  let component: LogoutResetComponent;
  let fixture: ComponentFixture<LogoutResetComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ LogoutResetComponent ],
      imports: [ RouterTestingModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ("should call onLogout", () => {
    component.onLogout();
    expect(component.onLogout).toBeDefined();
  });

  it ("should call onResetPassword", () => {
    component.onResetPassword();
    expect(component.onResetPassword).toBeDefined();
  });
});
