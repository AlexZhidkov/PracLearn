import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Template } from '../model/template';

@Component({
  selector: 'app-project-group-edit',
  templateUrl: './project-group-edit.component.html',
  styleUrls: ['./project-group-edit.component.scss']
})
export class ProjectGroupEditComponent implements OnInit {
  projectGroupId: string;
  projectGroupDoc: AngularFirestoreDocument<Template>;
  projectGroup: Observable<Template>;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectGroupId = this.route.snapshot.paramMap.get('id');
    this.projectGroupDoc = this.afs.doc<Template>('templates/' + this.projectGroupId);
    this.projectGroup = this.projectGroupDoc.valueChanges();

    this.projectGroup.subscribe(e => {
      this.isLoading = false;
    });
  }

}
