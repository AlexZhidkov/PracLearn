import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UniversityTodo } from '../model/university-todo';

@Injectable()
export class EventStoreService extends BaseService<any> {
  firestorePath: string;
  constructor(afs: AngularFirestore) {
    super(afs);
    this.assignCollection('events');
  }

  assignCollection(path: string) {
    this.firestorePath = path;
    this.setCollection(this.firestorePath);
  }
}
