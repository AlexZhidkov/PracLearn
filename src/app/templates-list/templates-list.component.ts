import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../model/template';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {
  templates: Observable<Template[]>;
  isLoading: boolean;

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.projectService.setCollection('templates');
    this.templates = this.projectService.list();
    this.templates.subscribe(e => {
      this.isLoading = false;
    });
  }
}
