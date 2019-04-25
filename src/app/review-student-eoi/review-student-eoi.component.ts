import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EoiStudent } from '../model/eoi-student';

@Component({
  selector: 'app-review-student-eoi',
  templateUrl: './review-student-eoi.component.html',
  styleUrls: ['./review-student-eoi.component.scss']
})
export class ReviewStudentEoiComponent implements OnInit {
  isLoading = true;
  userId: string;
  eoiId: string;
  private eoiDoc: AngularFirestoreDocument<EoiStudent>;
  eoi: EoiStudent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public afs: AngularFirestore) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('uid');
    this.eoiId = this.route.snapshot.paramMap.get('id');
    this.eoiDoc = this.afs.doc<any>(`/users/${this.userId}/submittedEoiStudent/${this.eoiId}`);
    this.eoiDoc.valueChanges().subscribe(doc => {
      this.eoi = doc;
      this.isLoading = false;
    });
  }

  inviteForInterview() {
    console.log('invited for interview');
  }

  rejectEoiStudent() {
    console.log('rejected');
  }
}
