import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EoiStudentService } from '../services/eoi-student.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectId: string;
  isLoading: boolean;
  private projectDoc: AngularFirestoreDocument<Project>;
  project: Observable<Project>;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              public afs: AngularFirestore,
              public eoiStudentService: EoiStudentService) { }

  ngOnInit() {
    this.isLoading = true;
    if (!localStorage.getItem('userPrimaryRole')) {
      localStorage.setItem('userPrimaryRole', 'student');
    }

    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectDoc = this.afs.doc<Project>('marketplace/' + this.projectId);
    this.project = this.projectDoc.valueChanges();
    this.project.subscribe(() => this.isLoading = false);
  }

  storeProjectUrl(projectId: string) {
    this.eoiStudentService.setEoiStudentPath('/student/eoi/' + projectId + '/true');
  }
}
