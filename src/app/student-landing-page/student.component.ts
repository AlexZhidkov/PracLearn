import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  projects: Observable<Project[]>;
  isLoading: boolean;

  constructor(private router: Router,
              private projectService: ProjectService,
              private auth: AuthService) {
    this.auth.isStudent = true;
  }

  ngOnInit() {
    this.isLoading = true;
    if (!localStorage.getItem('userPrimaryRole')) {
      localStorage.setItem('userPrimaryRole', 'student');
    }
    this.projectService.setCollection('projects');
    this.projects = this.projectService.list();
    this.projects.subscribe(e => {
      this.isLoading = false;
    });
  }

  addNewProject(): void {
    this.projectService.add({ title: '', description: '' })
      .then(r => this.router.navigate(['/projectEdit/' + r.id]));
  }
}
