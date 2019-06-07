import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UserProfile } from '../model/user-profile';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  projects: Observable<Project[]>;
  user: UserProfile;
  faculties: string[];
  faculty: string;
  semesters: string[];
  semester: string;
  isLoading: boolean;

  constructor(private router: Router,
              private projectService: ProjectService,
              private auth: AuthService,
              private dataService: DataService) {
    this.auth.isStudent = true;
  }

  ngOnInit() {
    this.isLoading = true;
    if (!localStorage.getItem('userPrimaryRole')) {
      localStorage.setItem('userPrimaryRole', 'student');
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    const faculty = localStorage.getItem('faculty');
    if (faculty) {
      this.projectService.setCollection('projects', ref => ref.where('faculty', '==', faculty));
    } else {
      this.projectService.setCollection('projects');
    }
    this.projects = this.projectService.list();
    this.projects.subscribe(e => {
      this.isLoading = false;
    });
    this.faculties = this.dataService.getFaculties();
    this.semesters = [
      'Semester 1. 25 February - 	24 May',
      'Semester 2. 29 July - 25 October',
      'Semester 3. ',
      'Semester 4. '
    ];
  }

}
