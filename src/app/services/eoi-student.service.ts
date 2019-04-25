import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EoiStudent } from '../model/eoi-student';

@Injectable()
export class EoiStudentService extends BaseService<EoiStudent> {
  eoiStudentPath: string;
  constructor(afs: AngularFirestore) {
    super(afs);
  }

  setEoiStudentPath(eoiStudentPath: string) {
    this.eoiStudentPath = eoiStudentPath;
  }

  getEoiStudentPath(): string {
    return this.eoiStudentPath;
  }
}
