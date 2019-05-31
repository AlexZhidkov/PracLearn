import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-project',
  templateUrl: './business-project.component.html',
  styleUrls: ['./business-project.component.scss']
})
export class BusinessProjectComponent implements OnInit {
  projectId: string;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

}
