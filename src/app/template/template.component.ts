import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EoiBusinessService } from '../services/eoi-business.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  templateId: string;
  isLoading: boolean;
  private templateDoc: AngularFirestoreDocument<Template>;
  template: Observable<Template>;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              public afs: AngularFirestore,
              public eoiBusinessService: EoiBusinessService) { }

  ngOnInit() {
    this.isLoading = true;
    this.templateId = this.route.snapshot.paramMap.get('id');
    this.templateDoc = this.afs.doc<Template>('templates/' + this.templateId);
    this.template = this.templateDoc.valueChanges();
    this.template.subscribe(() => this.isLoading = false);
  }

  storeTemplateId(templateId: string) {
    this.eoiBusinessService.setEoiBusinessPath('/business/eoi/' + templateId + '/true');
  }
}
