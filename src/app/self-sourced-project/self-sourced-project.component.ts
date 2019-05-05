import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as JSZipUtils from 'jszip-utils';
import * as JSZip from 'jszip';
import * as docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';


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

