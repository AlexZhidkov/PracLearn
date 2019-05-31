import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { ProjectGroup } from '../model/project-group';

@Component({
  selector: 'app-project-groups-list',
  templateUrl: './project-groups-list.component.html',
  styleUrls: ['./project-groups-list.component.scss']
})
export class ProjectGroupsListComponent implements OnInit {
  projects: Observable<ProjectGroup[]>;
  isLoading: boolean;

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.projectService.setCollection('projectGroups');
    this.projects = this.projectService.list();
    this.projects.subscribe(e => {
      this.isLoading = false;
    });
  }

}
