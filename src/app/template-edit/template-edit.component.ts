import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Template } from '../model/template';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss']
})
export class TemplateEditComponent implements OnInit {
  templateId: string;
  templateDoc: AngularFirestoreDocument<Template>;
  template: Observable<Template>;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.templateId = this.route.snapshot.paramMap.get('id');
    this.templateDoc = this.afs.doc<Template>('templates/' + this.templateId);
    this.template = this.templateDoc.valueChanges();

    this.template.subscribe(e => {
      this.isLoading = false;
    });
  }

}
