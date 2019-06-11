import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as JSZipUtils from 'jszip-utils';
import * as JSZip from 'jszip';
import * as docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventStoreService } from '../services/event-store.service';
import { UniversityTodoService } from '../services/university-todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../services/data.service';
import { Project } from '../model/project';

@Component({
  selector: 'app-self-sourced-project',
  templateUrl: './self-sourced-project.component.html',
  styleUrls: ['./self-sourced-project.component.scss']
})
export class SelfSourcedProjectComponent implements OnInit {
  smallScreen: boolean;
  user: UserProfile;
  projectDoc: AngularFirestoreDocument<Project>;
  project: Observable<Project>;

  isLoading = true;

  hostInstitutionFormGroup: FormGroup;
  studentFormGroup: FormGroup;
  courseFormGroup: FormGroup;
  placementFormGroup: FormGroup;
  projectOutlineFormGroup: FormGroup;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private universityTodoService: UniversityTodoService,
    private eventStoreService: EventStoreService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.projectDoc = this.afs.doc<Project>(`/users/${this.user.uid}/data/eoi-student`);
    this.project = this.projectDoc.valueChanges();
    this.project.subscribe(r => {
      this.bindFormControls(r);
      this.isLoading = false;
    });
  }

  bindFormControls(r: Project) {
    this.hostInstitutionFormGroup = this.formBuilder.group({
      hostNameCtrl: [r.business.name],
      hostAddressCtrl: [r.business.address],
      hostAbnCtrl: [r.business.abn],
      supervisorNameCtrl: [r.supervisor.name],
      supervisorTitleCtrl: [r.supervisor.title],
      supervisorPhoneCtrl: [r.supervisor.phone],
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
      startDateCtrl: [r.startDate],
      endDateCtrl: [r.endDate],
      locationCtrl: [r.location],
    });
    this.projectOutlineFormGroup = this.formBuilder.group({
      projectNameCtrl: [r.title],
      projectBackgroundCtrl: [r.description],
      skillsAndExperienceCtrl: [r.skillsAndExperience],
      studentLevelCtrl: [r.studentLevel],
      placementDetailsCtrl: [r.placementDetails],
      deliverablesCtrl: [r.deliverables],
      learningOutcomesCtrl: [r.learningOutcomes]
    });
  }

  submit() {
    this.projectDoc.get()
      .subscribe(projectSnapshot => {
        const project = projectSnapshot.data() as Project;
        this.universityTodoService.setCollection('universities/uwa/todo');
        this.universityTodoService
          .add({
            created: this.dataService.getTimestamp(new Date()),
            title: 'Project request received',
            project
          })
          .then(() => this.openSnackBar('Thank you for applying'))
          .catch(() => this.openSnackBar('ERROR: failed to submit application'));
        this.eventStoreService
          .add({
            event: 'Project application submitted',
            user: {
              uid: this.user.uid,
              displayName: this.user.displayName
            }, eoiBusiness: project
          });
      });
    this.router.navigateByUrl('student');
  }

  loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
  }
  // https://docxtemplater.readthedocs.io/en/latest/installation.html#browser
  // https://docxtemplater.readthedocs.io/en/latest/generate.html
  // https://docxtemplater.com/demo/#simple
  public generateDocument() {
    this.project = this.projectDoc.valueChanges();
    this.project.subscribe((data: Project) => {

      this.loadFile('./assets/Student Placement Arrangement.docx', (error, content) => {
        if (error) { throw new Error(error); }

        const zip = new JSZip(content);
        const doc = new docxtemplater().loadZip(zip);
        doc.setOptions({ linebreaks: true });
        doc.setData(data);
        try {
          // render the document (replace all occurrences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          const e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          };
          console.log(JSON.stringify({ error: e }));
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
          throw error;
        }
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(out, `Student Placement Arrangement - ${data.student.name}.docx`);
      });
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
