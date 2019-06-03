import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../model/project';

@Injectable()
export class ProjectService extends BaseService<Project> {
  firestorePath: string;
  constructor(afs: AngularFirestore) {
    super(afs);
  }

  assignCollection(path: string) {
    this.firestorePath = path;
    this.setCollection(this.firestorePath);
  }
}
