import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projectId: string;
  projectDoc: AngularFirestoreDocument<Project>;
  project: Observable<Project>;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectDoc = this.afs.doc<Project>('projects/' + this.projectId);
    this.project = this.projectDoc.valueChanges();

    this.project.subscribe(e => {
      this.isLoading = false;
    });
  }

}
