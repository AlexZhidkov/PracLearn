import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { SelfSourcedArrangement } from '../model/self-sourced-arrangement';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserProfile } from '../model/user-profile';
import { Project } from '../model/project';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  preEois: Observable<Project[]>;
  selfSourcedProject: SelfSourcedArrangement;
  user: UserProfile;
  isLoading: boolean;
  areas = [
    'Marketing - Instagram',
    'Marketing - Facebook',
    'Marketing - Website',
    'Science',
    'Etc',
    'Inspiration'
  ];

  constructor(private router: Router,
              private projectService: ProjectService,
              private preEoisService: ProjectService,
              private afs: AngularFirestore,
              private auth: AuthService) {
    this.auth.isBusiness = true;
  }

  ngOnInit() {
    this.isLoading = true;
    if (!localStorage.getItem('userPrimaryRole')) {
      localStorage.setItem('userPrimaryRole', 'business');
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    const selfSourcedUrl = '/selfSourced/' + this.user.uid;
    const selfSourcedProjectDoc = this.afs.doc<SelfSourcedArrangement>(selfSourcedUrl);
    const selfSourcedProjectObservable = selfSourcedProjectDoc.valueChanges();
    selfSourcedProjectObservable.subscribe(project => this.selfSourcedProject = project);

    this.preEoisService.setCollection(`/users/${this.user.uid}/eoiBusiness`);
    this.preEois = this.preEoisService.list();
  }

}
