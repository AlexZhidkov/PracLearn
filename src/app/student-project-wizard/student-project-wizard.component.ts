import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelfSourcedArrangement } from '../model/self-sourced-arrangement';
import { EventStoreService } from '../services/event-store.service';
import { UniversityTodoService } from '../services/university-todo.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-student-project-wizard',
  templateUrl: './student-project-wizard.component.html',
  styleUrls: ['./student-project-wizard.component.scss']
})
export class StudentProjectWizardComponent implements OnInit {
  smallScreen: boolean;
  user: UserProfile;
  eoiDoc: AngularFirestoreDocument<any>;
  eoi: Observable<any>;

  isLoading = true;

  hostInstitutionFormGroup: FormGroup;
  studentFormGroup: FormGroup;
  courseFormGroup: FormGroup;
  placementFormGroup: FormGroup;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private universityTodoService: UniversityTodoService,
    private eventStoreService: EventStoreService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    const selfSourcedUrl = '/users/' + this.user.uid + '/selfSourced';

    this.afs.collection<SelfSourcedArrangement>(selfSourcedUrl).ref.limit(1).get()
      .then((documentSnapshot) => {
        if (documentSnapshot.empty) {
          this.afs.collection<SelfSourcedArrangement>(selfSourcedUrl)
            .add({
              userId: this.user.uid,
              universityName: '',
              universityAddress: '',
              universityAbn: '',
              placementOfficer: '',
              placementOfficerPhone: '',
              placementOfficerEmail: '',
              hostName: '',
              hostAddress: '',
              hostAbn: '',
              supervisorName: '',
              supervisorTitle: '',
              supervisorPhone: '',
              supervisorEmail: '',
              studentName: this.user.displayName,
              studentTitle: '',
              studentId: '',
              studentPhone: '',
              studentEmail: this.user.email,
              courseName: '',
              majorDisciplineArea: '',
              startDate: '',
              endDate: '',
              location: '',
              projectName: '',
              projectBackground: '',
              skillsAndExperience: '',
              studentLevel: '',
              placementDetails: '',
              deliverables: '',
              learningOutcomes: ''
            })
            .then(r => {
              this.eoiDoc = this.afs.doc<SelfSourcedArrangement>(selfSourcedUrl + '/' + r.id);
              this.bindFormControls();
            });
        } else {
          this.eoiDoc = this.afs.doc<SelfSourcedArrangement>(selfSourcedUrl + '/' + documentSnapshot.docs[0].id);
          this.bindFormControls();
        }
      });
  }

  bindFormControls() {
    this.eoi = this.eoiDoc.valueChanges();
    this.eoi.subscribe((r: SelfSourcedArrangement) => {
      this.isLoading = false;
      this.hostInstitutionFormGroup = this.formBuilder.group({
        hostNameCtrl: [r.hostName],
        hostAddressCtrl: [r.hostAddress],
        hostAbnCtrl: [r.hostAbn],
        supervisorNameCtrl: [r.supervisorName],
        supervisorTitleCtrl: [r.supervisorTitle],
        supervisorPhoneCtrl: [r.supervisorPhone],
        supervisorEmailCtrl: [r.supervisorEmail],
      });
      this.studentFormGroup = this.formBuilder.group({
        studentNameCtrl: [r.studentName],
        studentTitleCtrl: [r.studentTitle],
        studentIdCtrl: [r.studentId],
        studentPhoneCtrl: [r.studentPhone],
        studentEmailCtrl: [r.studentEmail],
      });
      this.courseFormGroup = this.formBuilder.group({
        courseNameCtrl: [r.courseName],
        majorDisciplineAreaCtrl: [r.majorDisciplineArea],
      });
      this.placementFormGroup = this.formBuilder.group({
        startDateCtrl: [r.startDate],
        endDateCtrl: [r.endDate],
        locationCtrl: [r.location],
      });
    });
  }

  sendToBusiness() {
    this.eoiDoc.get()
      .subscribe(selfSourcedSnapshot => {
        const selfSourced = selfSourcedSnapshot.data() as SelfSourcedArrangement;
        this.universityTodoService.setCollection('universities/uwa/todo');
        this.universityTodoService
          .add({ title: 'Student sent Self Sourced Placement Arrangement to Business', selfSourced })
          .then(() => this.openSnackBar('Thank you for sending'))
          .catch(() => this.openSnackBar('ERROR: failed to send  application'));
        this.eventStoreService
          .add({
            event: 'Student sent self-sourced placement to business',
            user: {
              uid: this.user.uid,
              displayName: this.user.displayName
            }, eoiBusiness: selfSourced
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
