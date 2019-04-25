import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectEditDialogComponent } from '../project-edit-dialog/project-edit-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ProjectGroup } from '../model/project-group';
import { EoiBusinessService } from '../services/eoi-business.service';

@Component({
  selector: 'app-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.scss']
})
export class ProjectGroupComponent implements OnInit {
  projectGroupId: string;
  isLoading: boolean;
  private projectGroupDoc: AngularFirestoreDocument<ProjectGroup>;
  projectGroup: Observable<ProjectGroup>;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              public afs: AngularFirestore,
              public eoiBusinessService: EoiBusinessService) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectGroupId = this.route.snapshot.paramMap.get('id');
    this.projectGroupDoc = this.afs.doc<ProjectGroup>('projectGroups/' + this.projectGroupId);
    this.projectGroup = this.projectGroupDoc.valueChanges();
    this.projectGroup.subscribe(() => this.isLoading = false);
  }

  storeProjectGroupId(projectGroupId: string) {
    this.eoiBusinessService.setEoiBusinessPath('/business/eoi/' + projectGroupId + '/true');
  }
}
