import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faculties: string[];
  faculty: string;
  userPrimaryRole: string;
  showUserPrimaryRoleSelector: boolean;
  studentUniversity: string;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userPrimaryRole = localStorage.getItem('userPrimaryRole');
    this.studentUniversity = localStorage.getItem('university');
    this.faculty = localStorage.getItem('faculty');
    this.showUserPrimaryRoleSelector = !Boolean(this.userPrimaryRole);

    this.faculties = [
      'Business, Operations/Consulting',
      'Marketing',
      'Accounting',
      'Human Resources'
    ];
  }

  updateUserPrimaryRole(role: string) {
    localStorage.setItem('userPrimaryRole', role);
  }

  login(provider: string) {
    localStorage.setItem('university', this.studentUniversity);
    localStorage.setItem('userPrimaryRole', this.userPrimaryRole);
    localStorage.setItem('faculty', this.faculty);

    switch (provider) {
      case 'facebook': {
        this.authService.loginWithFacebook()
          .then(() => this.redirectAfterLogin());
        break;
      }
      case 'google': {
        this.authService.loginWithGoogle()
          .then(() => this.redirectAfterLogin());
        break;
      }
    }
  }

  redirectAfterLogin() {
    const redirectAfterLoginPath = this.userPrimaryRole ? this.userPrimaryRole : '/';
    this.router.navigate([redirectAfterLoginPath]);
  }
}
