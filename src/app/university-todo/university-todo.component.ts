import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EventStoreService } from '../services/event-store.service';
import { UserProfile } from '../model/user-profile';
import { DataService } from '../services/data.service';

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
