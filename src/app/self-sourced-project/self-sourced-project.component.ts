import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-self-sourced-project',
  templateUrl: './self-sourced-project.component.html',
  styleUrls: ['./self-sourced-project.component.scss']
})
export class SelfSourcedProjectComponent implements OnInit {
  user: UserProfile;
  eoiDoc: AngularFirestoreDocument<any>;
  eoi: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    const selfSourcedUrl = '/users/' + this.user.uid + '/selfSourced';
    const eoiId = this.route.snapshot.paramMap.get('eoiId');
    const isNewProject = (eoiId === 'new');

    if (isNewProject) {
      this.afs.collection<any>(selfSourcedUrl)
        .add({
          student: {
            id: this.user.uid,
            name: this.user.displayName,
            email: this.user.email,
            title: '',
            studentId: '',
            phone: '',
          },
        })
        .then(r => {
          this.eoiDoc = this.afs.doc<any>(selfSourcedUrl + '/' + r.id);
          this.bindFormControls();
        });
    } else {
      this.eoiDoc = this.afs.doc<any>(selfSourcedUrl + '/' + eoiId);
      this.bindFormControls();
    }
  }

  bindFormControls() {
    // ToDo: implement similar to others
  }
}
