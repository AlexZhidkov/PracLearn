import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  @Input() pId: string;
  p: any;
  projectType: string;
  projectId: string;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    if (this.pId) {
      this.projectType = 'projects';
      this.projectId = this.pId;
    } else {
      this.projectType = this.route.snapshot.paramMap.get('type');
      this.projectId = this.route.snapshot.paramMap.get('id');
    }
    const projectUrl = `/${this.projectType}/${this.projectId}`;
    const projectDoc = this.afs.doc<any>(projectUrl);
    const projectObservable = projectDoc.valueChanges();
    projectObservable.subscribe(project => {
      this.p = project;
    });
  }

}
