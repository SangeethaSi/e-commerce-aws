import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from '../model/UserDetails';
import { UserRegistrationService } from '../services/user-service/user-registration.service';

import { mustMatch } from '../validators/password-match';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
     private userRegistrationService: UserRegistrationService, private route: Router) {
    
   }

  ngOnInit(): void {
    this.setRegistrationForm();
  }

  setRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      loginId: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      contactNumber: ['', Validators.required]
    }, 
    {
      validator: mustMatch('password', 'confirmPassword')
    }
    )
  }

  onRegisterClick() {
     this.submitted = true;
     if (this.registrationForm.valid) {
        let registerRequestJson: UserDetails = {};	
        registerRequestJson.firstName = this.registrationForm.get('firstName')?.value;
        registerRequestJson.lastName = this.registrationForm.controls['lastName'].value;
        registerRequestJson.email = this.registrationForm.get('email')?.value;
        registerRequestJson.loginId = this.registrationForm.controls['loginId'].value;
        registerRequestJson.password = this.registrationForm.get('password')?.value;
        registerRequestJson.contactNumber = this.registrationForm.controls['contactNumber'].value;
        this.userRegistrationService.saveUserRegistrationDetails(registerRequestJson).subscribe(registeredData => {
          if (registeredData) {
            console.log("User Successfully Registered", registeredData);
            this.userRegistrationService.userDetails.next(registeredData);
            window.alert("User Successfully Registered")
            this.route.navigate(['/login'])
          }
          
        });
    } 
  }

  onRegisterReset() {
    console.log("Reset Method Called");
    this.submitted = false;
    this.registrationForm.reset();
    Object.keys(this.registrationForm.controls).forEach(controlKey => {
      this.registrationForm.controls[controlKey].setErrors(null);
    }) 
    this.setRegistrationForm();  
  }
}
