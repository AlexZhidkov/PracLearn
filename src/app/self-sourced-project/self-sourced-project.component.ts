import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as JSZipUtils from 'jszip-utils';
import * as JSZip from 'jszip';
import * as docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-self-sourced-project',
  templateUrl: './self-sourced-project.component.html',
  styleUrls: ['./self-sourced-project.component.scss']
})
export class SelfSourcedProjectComponent implements OnInit {
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
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
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
    this.eoi = this.eoiDoc.valueChanges();
    this.eoi.subscribe(r => {
      this.isLoading = false;
      this.hostInstitutionFormGroup = this.formBuilder.group({
        hostNameCtrl: [r.hostName],
        hostAddressCtrl: [r.hostAddress],
        hostAbnCtrl: [r.hostAbn],
      });
      this.studentFormGroup = this.formBuilder.group({
        studentNameCtrl: [r.studentName],
        studentIdCtrl: [r.studentId],
        studentPhoneCtrl: [r.studentPhone],
        studentEmailCtrl: [r.studentEmail],
      });
      this.courseFormGroup = this.formBuilder.group({
        courseNameCtrl: [r.courseName],
        courseTitleCtrl: [r.courseTitle],
        majorDisciplineAreaCtrl: [r.majorDisciplineArea],
      });
      this.placementFormGroup = this.formBuilder.group({
        startDateCtrl: [r.startDate],
        endDateCtrl: [r.endDate],
        locationCtrl: [r.location],
      });
    });
  }

  loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
  }
  // https://docxtemplater.readthedocs.io/en/latest/installation.html#browser
  // https://docxtemplater.readthedocs.io/en/latest/generate.html
  // https://docxtemplater.com/demo/#simple
  public generateDocument() {
    this.eoi = this.eoiDoc.valueChanges();
    this.eoi.subscribe(data => {

      this.loadFile('./assets/Student Placement Arrangement.docx', (error, content) => {
        if (error) { throw new Error(error); }

        const zip = new JSZip(content);
        const doc = new docxtemplater().loadZip(zip);
        doc.setData({
          student_name: data.student.name,
        });
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
}
