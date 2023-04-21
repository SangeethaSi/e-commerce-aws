import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from '../model/UserDetails';
import { UserRegistrationService } from '../services/user-service/user-registration.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, 
    private userRegistrationService: UserRegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.setResetPasswordForm();    
  }

  setResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onResetPasswordClick() {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
        let userDetails = this.userRegistrationService.userDetails.getValue();
        console.log("Existing User details", userDetails);
        userDetails.password  = this.resetPasswordForm.controls['password'].value;
        this.userRegistrationService.resetPassword(userDetails).subscribe(data => {
         console.log("Existing User details", userDetails);
         console.log("Updated Details", data);
         window.alert("Password Changed")
         this.router.navigate(['/login'])
        });
    }
  }

  onResetForm() {
    this.submitted = false;
    this.resetPasswordForm.reset();
    Object.keys(this.resetPasswordForm.controls).forEach(controlKey => {
      this.resetPasswordForm.controls[controlKey].setErrors(null);
    })
    this.setResetPasswordForm();  
  }

  onGoBack() {
    this.router.navigate(['/display-products'])
  }
}
