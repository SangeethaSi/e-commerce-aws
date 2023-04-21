import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from '../model/UserDetails';
import { UserRegistrationService } from '../services/user-service/user-registration.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  invalidUser = false;
  isNewUser = false;

  constructor(private fb: FormBuilder, 
    private userRegistrationService: UserRegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.setLoginForm();
    
  }

  setLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLoginClick() {
    this.submitted = true;
    if (this.loginForm.valid) {
        let loginDetails: UserDetails = {};   
        loginDetails.email = this.loginForm.controls['email'].value;
        loginDetails.password = this.loginForm.controls['password'].value;
        this.userRegistrationService.getUserDetails(loginDetails).subscribe(data => {
          console.log('Data Received', data);
          if(data.email && data.password === loginDetails.password) {
              this.userRegistrationService.assignUserRole(data);
              this.userRegistrationService.userName = data.email;
              this.router.navigate(['/display-products']);
          } else if (data.email) {
              this.invalidUser = true;
          } else {
            this.isNewUser = true;
          }
        });
    }
  }

  onResetLoginForm() {
    this.submitted = false;
    this.loginForm.reset();
    Object.keys(this.loginForm.controls).forEach(controlKey => {
      this.loginForm.controls[controlKey].setErrors(null);
    })
    this.invalidUser = false;
    this.isNewUser = false;
    this.setLoginForm();  
  }
}
