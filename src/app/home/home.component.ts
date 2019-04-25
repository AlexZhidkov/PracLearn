import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  student() {
    localStorage.setItem('userPrimaryRole', 'student');
    this.router.navigate(['/student/']);
  }

  business() {
    localStorage.setItem('userPrimaryRole', 'business');
    this.router.navigate(['/business/']);
  }

  university() {
    localStorage.setItem('userPrimaryRole', 'university');
    this.router.navigate(['/university/']);
  }
}
