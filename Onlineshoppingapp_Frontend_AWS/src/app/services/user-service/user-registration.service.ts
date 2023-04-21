import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from 'src/app/model/role';
import { UserDetails } from 'src/app/model/UserDetails';
import { HttpUtil } from 'src/app/utils/http-util';


@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  isUserAdmin: boolean = false;
  userName: string | undefined;
  userDetails = new BehaviorSubject<UserDetails>({});

  constructor(private httpUtil: HttpUtil) { }

  saveUserRegistrationDetails(registerRequestJson: UserDetails): Observable<UserDetails> {
    return this.httpUtil.saveDetailsToDatabase(registerRequestJson);
  }

  getUserDetails(loginRequestJson: UserDetails): Observable<UserDetails> {
    return this.httpUtil.getUserDetailsFromDatabase(loginRequestJson);
  }

  assignUserRole(userDetails: UserDetails) {
        console.log("Assign method called");
        this.userDetails.next(userDetails);
        //reset the value
        this.isUserAdmin = false;
        localStorage.setItem('IsUserAdmin', this.isUserAdmin.toString());
        if (userDetails.role?.toLowerCase === Role.Admin.toLowerCase) {
          this.isUserAdmin = true;
          localStorage.setItem('IsUserAdmin', this.isUserAdmin.toString());
        }
  }
  
  getRegisterdedUserDetails() {
    this.userDetails.asObservable();
  }

  resetPassword(resetPasswordDetails: UserDetails): Observable<UserDetails> {
      return this.httpUtil.resetPasswordInDatabase(resetPasswordDetails);
  }
}
