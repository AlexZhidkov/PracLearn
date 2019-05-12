import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UniversityTodoService } from '../services/university-todo.service';
import { EventStoreService } from '../services/event-store.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  user: UserProfile;
  surveyDoc: AngularFirestoreDocument<any>;
  survey: Observable<any>;
  surveyTemplate: any;
  objectKeys = Object.keys;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private universityTodoService: UniversityTodoService,
    private eventStoreService: EventStoreService) { }

  ngOnInit() {
    this.surveyTemplate = {
      'I was happy with the supervision I received from my project supervisor': 0,
      'I was happy with the support I received from my colleagues': 0,
      'I was happy with the quality of my work placement': 0,
      'I have developed new skills as a result of the placement': 0,
      'I have developed existing skills as a result of the placement': 0,
      'I am more confident that my skills are of value and use at the workplace': 0,
      'I have a clearer sense of the direction I would like to go professionally': 0,
      'I would recommend the placement to the fellow student': 0
    };

    this.user = JSON.parse(localStorage.getItem('user'));
    const surveysUrl = '/users/' + this.user.uid + '/surveys';

    this.afs.collection<any>(surveysUrl).ref.limit(1).get()
      .then((documentSnapshot) => {
        if (documentSnapshot.empty) {
          this.afs.collection<any>(surveysUrl)
            .add(this.surveyTemplate)
            .then((r: any) => {
              this.surveyDoc = this.afs.doc<any>(surveysUrl + '/' + r.id);
              this.survey = this.surveyDoc.valueChanges();
            });
        } else {
          this.surveyDoc = this.afs.doc<any>(surveysUrl + '/' + documentSnapshot.docs[0].id);
          this.survey = this.surveyDoc.valueChanges();
        }
      });
  }

  updateDb(question: string, score: any) {
    const doc = {};
    doc[question] = score;
    this.surveyDoc.update(doc);
  }

  submit() {
    this.surveyDoc.get()
      .subscribe(surveySnapshot => {
        const survey = surveySnapshot.data();
        this.universityTodoService.setCollection('universities/uwa/todo');
        this.universityTodoService
          .add({ title: 'Survey submitted by a student', survey })
          .then(() => this.openSnackBar('Thank you for submitting'))
          .catch(() => this.openSnackBar('ERROR: failed to submit'));
        this.eventStoreService
          .add({
            event: 'Student submitted new survey',
            user: {
              uid: this.user.uid,
              displayName: this.user.displayName
            },
            survey
          });
      });
    this.router.navigateByUrl('student');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
