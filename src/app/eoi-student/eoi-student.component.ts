import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EoiStudent } from '../model/eoi-student';
import { UserProfile } from '../model/user-profile';
import { EventStoreService } from '../services/event-store.service';

@Component({
  selector: 'app-eoi-student',
  templateUrl: './eoi-student.component.html',
  styleUrls: ['./eoi-student.component.scss']
})
export class EoiStudentComponent implements OnInit {
  smallScreen: boolean;
  user: UserProfile;
  eoiStudentUrl: string;
  projectId: string;
  businessId: string;
  eoiId: string;
  isNewProject: boolean;
  eoiDoc: AngularFirestoreDocument<EoiStudent>;
  eoi: Observable<EoiStudent>;
  isLoading: boolean;

  studyAreaFormGroup: FormGroup;
  whyFormGroup: FormGroup;
  commitmentFormGroup: FormGroup;
  attachmentsFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private eventStoreService: EventStoreService
  ) { }
  ngOnInit() { }
  /*
    ngOnInit() {
      this.isLoading = true;
      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small
      ]).subscribe(result => {
        this.smallScreen = result.matches;
      });
      this.user = JSON.parse(localStorage.getItem('user'));
      this.eoiStudentUrl = '/users/' + this.user.uid + '/eoiStudent';

      this.projectId = this.route.snapshot.paramMap.get('id');
      this.businessId = this.route.snapshot.paramMap.get('businessId');
      this.eoiId = this.route.snapshot.paramMap.get('eoiId');
      this.isNewProject = (this.route.snapshot.paramMap.get('isNewProject') === 'true');

      if (this.isNewProject) {
        this.afs.collection<EoiStudent>(this.eoiStudentUrl)
          .add({
            student: {
              studentId: '',
              title: '',
              phone: '',
              courseName: '',
              majorDisciplineArea: '',
              userId: this.user.uid,
              name: this.user.displayName,
              email: this.user.email,
              why: '',
              commitment: '',
              resumeUrl: '',
              transcriptUrl: ''
            },
            projectId: this.projectId,
            businessId: this.businessId,
          })
          .then(r => {
            this.eoiDoc = this.afs.doc<EoiStudent>(this.eoiStudentUrl + '/' + r.id);
            this.bindFormControls();
          });
      } else {
        this.eoiDoc = this.afs.doc<EoiStudent>(this.eoiStudentUrl + '/' + this.eoiId);
        this.bindFormControls();
      }
    }

    bindFormControls() {
      this.eoi = this.eoiDoc.valueChanges();
      this.eoi.subscribe(r => {
        this.isLoading = false;
        this.studyAreaFormGroup = this.formBuilder.group({
          studyAreaCtrl: [r.studyArea, Validators.required]
        });
        this.whyFormGroup = this.formBuilder.group({
          whyCtrl: [r.why, Validators.required]
        });
        this.commitmentFormGroup = this.formBuilder.group({
          commitmentCtrl: [r.commitment, Validators.required]
        });
        this.attachmentsFormGroup = this.formBuilder.group({
          resumeUrlCtrl: [r.resumeUrl, Validators.required],
          transcriptUrlCtrl: [r.transcriptUrl, Validators.required]
        });
      });
    }

    submitEoi() {
      this.eoiDoc.get()
        .subscribe(eoiStudentSnapshot => {
          const eoiStudent = eoiStudentSnapshot.data() as EoiStudent;
          eoiStudent.submittedOn = new Date();
          this.afs.collection<any>(`users/${this.businessId}/submittedEoiStudent`)
            .add(eoiStudent);
          this.eventStoreService
            .add({
              event: 'Student applied for placement',
              user: {
                uid: this.user.uid,
                displayName: this.user.displayName
              },
              eoiStudent
            });
        });
      this.router.navigateByUrl('student');
    }
  */
}
