import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Component({
  selector: 'app-project-edit-dialog',
  templateUrl: './project-edit-dialog.component.html',
  styleUrls: ['./project-edit-dialog.component.scss']
})
export class ProjectEditDialogComponent implements OnInit {
  projectDoc: AngularFirestoreDocument<Project>;
  project: Observable<Project>;
  isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<ProjectEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectDoc = this.afs.doc<Project>('projects/' + this.data);
    this.project = this.projectDoc.valueChanges();

    this.project.subscribe(e => {
      this.isLoading = false;
    });
  }

}
