import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EventStoreService } from '../services/event-store.service';
import { UserProfile } from '../model/user-profile';
import { DataService } from '../services/data.service';
import { Project } from '../model/project';
import { EoiStudent } from '../model/eoi-student';

@Component({
  selector: 'app-university-todo',
  templateUrl: './university-todo.component.html',
  styleUrls: ['./university-todo.component.scss']
})
export class UniversityTodoComponent implements OnInit {
  user: UserProfile;
  todoId: string;
  isLoading: boolean;
  private todoDoc: AngularFirestoreDocument<any>;
  todo: any;
  faculties: string[];
  faculty: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public afs: AngularFirestore,
              private eventStoreService: EventStoreService,
              private dataService: DataService
  ) { }

  ngOnInit() {
    this.faculties = this.dataService.getFaculties();

    this.user = JSON.parse(localStorage.getItem('user'));
    this.todoId = this.route.snapshot.paramMap.get('id');
    this.todoDoc = this.afs.doc<any>('universities/uwa/todo/' + this.todoId);
    this.todoDoc.valueChanges().subscribe(doc => {
      this.todo = doc;
      this.isLoading = false;
    });
  }

  approveProject() {
    this.todo.faculty = this.faculty;
    this.todo.approvedByUniOn = new Date();
    const eoi = this.todo.eoi as EoiStudent;

    const newProject: Project = {
      id: this.todoId,
      originType: eoi.originType,
      title: 'Self-sourced project',
      subtitle: null,
      learningOutcomes: null,
      location: null,
      placementDetails: null,
      placementOfficer: null,
      skillsAndExperience: null,
      startDate: null,
      endDate: null,
      studentLevel: null,
      supervisor: {
        name: eoi.supervisor.name,
        email: eoi.student.email,
        title: null,
        phone: null
      },
      university: {
        name: 'UWA',
        abn: null,
        address: null
      },
      business: {
        userId: eoi.business.userId,
        name: eoi.business.name,
        abn: null,
        address: null
      },
      deliverables: null,
      description: 'Please provide project description here',
      student: eoi.student,
    };
    this.afs.collection<any>('projects')
      .add(newProject)
      .then(() => this.todoDoc.delete());
    this.eventStoreService
      .add({
        event: 'University approved business application',
        user: {
          uid: this.user.uid,
          displayName: this.user.displayName
        },
        project: this.todo
      });
    this.router.navigateByUrl('/university');
  }

  rejectProject() {
    this.todo.rejectedOn = new Date();
    this.afs.collection<any>('universities/uwa/rejected')
      .add(this.todo)
      .then(() => this.todoDoc.delete());
    this.eventStoreService
      .add({
        event: 'University rejected business application',
        user: {
          uid: this.user.uid,
          displayName: this.user.displayName
        },
        project: this.todo.project
      });
    this.router.navigateByUrl('/university');
  }

  // ToDo delete this
  approveEoiBusiness() {
    this.todo.eoiBusiness.faculty = this.faculty;
    this.todo.eoiBusiness.approvedByUniOn = new Date();
    this.afs.collection<any>('projects')
      .add(this.todo.eoiBusiness)
      .then(() => this.todoDoc.delete());
    this.eventStoreService
      .add({
        event: 'University approved business application',
        user: {
          uid: this.user.uid,
          displayName: this.user.displayName
        },
        eoiBusiness: this.todo.eoiBusiness
      });
    this.router.navigateByUrl('/university');
  }

  // ToDo delete this
  rejectEoiBusiness() {
    this.todo.rejectedOn = new Date();
    this.afs.collection<any>('universities/uwa/rejectedEoiBusiness')
      .add(this.todo)
      .then(() => this.todoDoc.delete());
    this.eventStoreService
      .add({
        event: 'University rejected business application',
        user: {
          uid: this.user.uid,
          displayName: this.user.displayName
        },
        eoiBusiness: this.todo.eoiBusiness
      });
    this.router.navigateByUrl('/university');
  }
}
