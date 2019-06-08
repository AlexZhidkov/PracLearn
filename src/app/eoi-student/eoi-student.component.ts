import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventStoreService } from '../services/event-store.service';
import { UniversityTodoService } from '../services/university-todo.service';
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { DataService } from '../services/data.service';
import { ProjectOriginType } from '../model/projectOriginType';
import { EoiStudent } from '../model/eoi-student';

@Component({
  selector: 'app-eoi-student',
  templateUrl: './eoi-student.component.html',
  styleUrls: ['./eoi-student.component.scss']
})
export class EoiStudentComponent implements OnInit {
  smallScreen: boolean;
  user: UserProfile;
  eoiId: string;
  projectId = '';
  private projectDoc: AngularFirestoreDocument<EoiStudent>;
  project: Observable<EoiStudent>;
  isLoading = true;
  originType: ProjectOriginType;
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
    this.eoiId = this.route.snapshot.paramMap.get('eoiId');
    this.user = JSON.parse(localStorage.getItem('user'));
    let projectUrl = '';
    projectUrl = `/users/${this.user.uid}/data/eoi-student`;
    this.submitButtonText = 'Submit';
    switch (this.eoiId) {
      case 'self-sourced':
        this.originType = ProjectOriginType.selfSourced;
        this.projectTitle = 'Self-Sourced Internship';
        this.submitStepLabel = 'Host';
        break;
      case 'bespoke':
        this.originType = ProjectOriginType.bespoke;
        this.projectTitle = 'Expression of Interest';
        this.submitStepLabel = 'Submit';
        break;
      default: // application for a marketplace project
        this.originType = ProjectOriginType.marketplace;
        this.projectTitle = 'Expression of Interest';
        this.submitStepLabel = 'Submit';
        this.projectId = this.eoiId;
        break;
    }

    this.projectDoc = this.afs.doc<EoiStudent>(projectUrl);
    this.project = this.projectDoc.valueChanges();
    this.project.subscribe(r => {
      if (!r) {
        r = {
          originType: this.originType,
          university: 'UWA',
          projectId: this.projectId,
          business: {
            userId: '',
            name: '',
          },
          supervisor: {
            name: '',
            email: '',
          },
          student: {
            userId: this.user.uid,
            name: this.user.displayName,
            title: '',
            studentId: '',
            phone: '',
            email: this.user.email,
            courseName: '',
            majorDisciplineArea: '',
            why: '',
            commitment: '',
            startDate: null,
            endDate: null,
            resumeUrl: '',
            transcriptUrl: '',
          },
        };
        this.projectDoc.set(r);
      }
      this.bindFormControls(r);
      this.isLoading = false;
    });
  }

  bindFormControls(r: EoiStudent) {
    this.hostInstitutionFormGroup = this.formBuilder.group({
      hostNameCtrl: [r.business.name],
      supervisorNameCtrl: [r.supervisor.name],
      supervisorEmailCtrl: [r.supervisor.email],
    });
    this.studentFormGroup = this.formBuilder.group({
      studentNameCtrl: [r.student.name],
      studentTitleCtrl: [r.student.title],
      studentIdCtrl: [r.student.studentId],
      studentPhoneCtrl: [r.student.phone],
      studentEmailCtrl: [r.student.email],
    });
    this.courseFormGroup = this.formBuilder.group({
      courseNameCtrl: [r.student.courseName],
      majorDisciplineAreaCtrl: [r.student.majorDisciplineArea],
    });
    this.placementFormGroup = this.formBuilder.group({
      startDateCtrl: [r.student.startDate],
      endDateCtrl: [r.student.endDate],
    });
  }

  submit() {
    this.projectDoc.get()
      .subscribe(projectSnapshot => {
        const eoi = projectSnapshot.data() as EoiStudent;
        eoi.projectId = this.projectId;
        eoi.originType = this.originType;
        const event = {
          created: this.dataService.getTimestamp(new Date()),
          title: 'Student submitted EOI',
          eoi
        };

        this.universityTodoService.setCollection('universities/uwa/todo');
        this.universityTodoService
          .add(event)
          .then(() => this.openSnackBar('Thank you for submitting'))
          .catch(() => this.openSnackBar('ERROR: failed to submit application'));
        this.eventStoreService
          .add(event);
      });
    this.router.navigateByUrl('student');
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

  // dateChanged(type: string, event: MatDatepickerInputEvent<Date>): void {
  //   const date = new Date();
  //   date.setDate(event.value.getDate());
  //   date.setMonth(event.value.getMonth());
  //   date.setFullYear(event.value.getFullYear());
  //   if (type === 'start') {
  //     this.projectDoc.update({ startDate: date });
  //   } else {
  //     this.projectDoc.update({ endDate: date });
  //   }
  // }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
