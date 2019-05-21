import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  p: any;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    const projectType = this.route.snapshot.paramMap.get('type');
    const projectId = this.route.snapshot.paramMap.get('id');
    const projectUrl = `/${projectType}/${projectId}`;
    const projectDoc = this.afs.doc<any>(projectUrl);
    const projectObservable = projectDoc.valueChanges();
    projectObservable.subscribe(project => {
      this.p = project;
    });
  }

}
