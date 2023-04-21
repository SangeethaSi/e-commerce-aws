import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../services/user-service/user-registration.service';

@Component({
  selector: 'app-logout-reset',
  templateUrl: './logout-reset.component.html',
  styleUrls: ['./logout-reset.component.css']
})
export class LogoutResetComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }

  onResetPassword() {
    this.route.navigate(['/reset-password']);
  }
}
