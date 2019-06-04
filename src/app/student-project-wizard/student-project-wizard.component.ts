import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelfSourcedArrangement } from '../model/self-sourced-arrangement';
import { EventStoreService } from '../services/event-store.service';
import { UniversityTodoService } from '../services/university-todo.service';
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-student-project-wizard',
  templateUrl: './student-project-wizard.component.html',
  styleUrls: ['./student-project-wizard.component.scss']
})
export class StudentProjectWizardComponent implements OnInit {
  smallScreen: boolean;
  user: UserProfile;
  projectId: string;
  private projectDoc: AngularFirestoreDocument<SelfSourcedArrangement>;
  project: Observable<SelfSourcedArrangement>;
  isLoading = true;
  isMarketplace = false;
  isSelfSourced = false;
  isBespoke = false;
  projectTitle: string;
  submitStepLabel: string;
  submitButtonText: string;

  hostInstitutionFormGroup: FormGroup;
  studentFormGroup: FormGroup;
  courseFormGroup: FormGroup;
  placementFormGroup: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private universityTodoService: UniversityTodoService,
    private eventStoreService: EventStoreService
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.user = JSON.parse(localStorage.getItem('user'));
    let projectUrl = '';
    switch (this.projectId) {
      case 'self-sourced':
        this.isSelfSourced = true;
        this.projectTitle = 'Self-Sourced Internship';
        this.submitStepLabel = 'Host';
        this.submitButtonText = 'Submit';
        projectUrl = '/selfSourced/' + this.user.uid;
        break;
      case 'bespoke':
        this.isBespoke = true;
        this.projectTitle = 'Expression of Interest';
        this.submitStepLabel = 'Submit';
        this.submitButtonText = 'Submit';
        projectUrl = '/bespoke/' + this.user.uid;
        break;
      default: // application for a marketplace project
        this.isMarketplace = true;
        this.projectTitle = 'Expression of Interest';
        this.submitStepLabel = 'Submit';
        this.submitButtonText = 'Submit';
        projectUrl = `/projectEoi/${this.projectId}-${this.user.uid}`;
        break;
    }

    this.projectDoc = this.afs.doc<SelfSourcedArrangement>(projectUrl);
    this.project = this.projectDoc.valueChanges();
    this.project.subscribe(r => {
      if (!r) {
        r = {
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
          startDate: new Date(),
          endDate: new Date(),
          location: '',
          projectName: '',
          projectBackground: '',
          skillsAndExperience: '',
          studentLevel: '',
          placementDetails: '',
          deliverables: '',
          learningOutcomes: ''
        };
        this.projectDoc.set(r);
      }
      this.bindFormControls(r);
      this.isLoading = false;
    });
  }

  bindFormControls(r: SelfSourcedArrangement) {
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
  }

  submit() {
    this.projectDoc.get()
      .subscribe(selfSourcedSnapshot => {
        const project = selfSourcedSnapshot.data() as SelfSourcedArrangement;
        if (this.isMarketplace) {
          this.submitMarketplace(project);
        } else if (this.isBespoke) {
          this.submitBespoke(project);
        } else if (this.isSelfSourced) {
          this.sendEmailToBusiness(project);
        } else {
          this.openSnackBar('ERROR: unknown application type');
        }
      });
    this.router.navigateByUrl('student');
  }

  submitMarketplace(project) {
    const event = {
      created: this.dataService.getTimestamp(new Date()),
      title: 'Student submitted EOI for a project',
      student: {
        uid: this.user.uid,
        displayName: this.user.displayName
      },
      project
    };

    this.universityTodoService.setCollection('universities/uwa/todo');
    this.universityTodoService
      .add(event)
      .then(() => this.openSnackBar('Thank you for sending'))
      .catch(() => this.openSnackBar('ERROR: failed to send application'));
    this.eventStoreService
      .add(event);
  }

  submitBespoke(project) {
    const event = {
      created: this.dataService.getTimestamp(new Date()),
      title: 'Student submitted bespoke EOI',
      student: {
        uid: this.user.uid,
        displayName: this.user.displayName
      },
      project
    };

    this.universityTodoService.setCollection('universities/uwa/todo');
    this.universityTodoService
      .add(event)
      .then(() => this.openSnackBar('Thank you for sending'))
      .catch(() => this.openSnackBar('ERROR: failed to send application'));
    this.eventStoreService
      .add(event);
  }

  sendEmailToBusiness(project) {
    const event = {
      created: this.dataService.getTimestamp(new Date()),
      title: 'Student submitted Self Sourced Placement Arrangement',
      student: {
        uid: this.user.uid,
        displayName: this.user.displayName
      },
      project
    };

    this.universityTodoService.setCollection('universities/uwa/todo');
    this.universityTodoService
      .add(event)
      .then(() => this.openSnackBar('Thank you for submitting'))
      .catch(() => this.openSnackBar('ERROR: failed to send application'));
    this.eventStoreService
      .add(event);

    const projectUrl = `https://praclearn-dev.firebaseapp.com/project/self-sourced`;
    const email = {
      to: this.user.email,
      subject: 'Self-sourced project submitted',
      text: `Please complete self-sourced project application submitted by ${event.student.displayName} by clicking here: ${projectUrl}`
    };

    const emailsCollection = this.afs.collection<any>('emails');
    emailsCollection.add(email)
      .catch((err) => {
        console.error(err);
        this.openSnackBar('ERROR: failed to send email');
      });
  }

  dateChanged(type: string, event: MatDatepickerInputEvent<Date>): void {
    const date = new Date();
    date.setDate(event.value.getDate());
    date.setMonth(event.value.getMonth());
    date.setFullYear(event.value.getFullYear());
    if (type === 'start') {
      this.projectDoc.update({ startDate: date });
    } else {
      this.projectDoc.update({ endDate: date });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
