import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpUtil } from 'src/app/utils/http-util';

import { UserRegistrationService } from './user-registration.service';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let httpUtil: HttpUtil;

  let userDetails = {
    firstName: "Cogjava",
    lastName: "Angular",
    email: "cogjava@gmail.com",
    loginId: "98632",
    password: "12345",
    contactNumber: "7564674555",
    role: "admin"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(UserRegistrationService);
    httpUtil = TestBed.inject(HttpUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call saveUserRegistrationDetails', () => {
    spyOn(httpUtil, 'saveDetailsToDatabase').and.returnValue(of(userDetails));
    service.saveUserRegistrationDetails(userDetails);
    expect(service.saveUserRegistrationDetails).toBeDefined();
  });

  it('should call getUserDetails', () => {
    spyOn(httpUtil, 'getUserDetailsFromDatabase').and.returnValue(of(userDetails));
    service.getUserDetails(userDetails);
    expect(service.getUserDetails).toBeDefined();
  });

  it('should call resetPassword', () => {
    spyOn(httpUtil, 'resetPasswordInDatabase').and.returnValue(of(userDetails));
    service.resetPassword(userDetails);
    expect(service.resetPassword).toBeDefined();
  });

  it('should call assignUserRole', () => {
    service.assignUserRole(userDetails);
    expect(service.assignUserRole).toBeDefined();
  });

  it('should call getRegisterdedUserDetails', () => {
    service.getRegisterdedUserDetails();
    expect(service.getRegisterdedUserDetails).toBeDefined();
  });
});
