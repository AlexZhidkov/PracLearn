import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Observable<Project[]>;
  isLoading: boolean;

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.projectService.setCollection('marketplace');
    this.projects = this.projectService.list();
    this.projects.subscribe(e => {
      this.isLoading = false;
    });
  }

}
