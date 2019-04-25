import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { ProjectGroup } from '../model/project-group';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  projectGroups: Observable<ProjectGroup[]>;
  isLoading: boolean;
  areas = [
    'Marketing - Instagram',
    'Marketing - Facebook',
    'Marketing - Website',
    'Science',
    'Etc',
    'Inspiration'
  ];

  constructor(private router: Router,
              private projectService: ProjectService,
              private auth: AuthService) {
    this.auth.isBusiness = true;
  }

  ngOnInit() {
    this.isLoading = true;
    if (!localStorage.getItem('userPrimaryRole')) {
      localStorage.setItem('userPrimaryRole', 'business');
    }
    this.projectService.setCollection('projectGroups');
    this.projectGroups = this.projectService.list();
    this.projectGroups.subscribe(e => {
      this.isLoading = false;
    });
  }

  addNewProjectGroup(): void {
    this.projectService.add({ title: '', description: '' })
      .then(r => this.router.navigate(['/projectGroupEdit/' + r.id]));
  }
}
