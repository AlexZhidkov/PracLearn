import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversityTodoService } from '../services/university-todo.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
  todos: Observable<any[]>;
  isLoading: boolean;
  dataSource: any[] = [
    { school: 'Business School', students: 25, hosts: 15 },
    { school: 'Confucius Institute', students: 56, hosts: 7 },
    { school: 'School of Design', students: 34, hosts: 34 },
    { school: 'School of Humanities', students: 62, hosts: 14 },
    { school: 'Law School', students: 24, hosts: 23 },
    { school: 'Conservatorium of Music', students: 11, hosts: 14 },
    { school: 'School of Social Sciences', students: 17, hosts: 21 },
  ];
  displayedColumns: string[] = ['school', 'students', 'hosts'];

  constructor(private universityTodoService: UniversityTodoService) { }

  ngOnInit() {
    this.isLoading = true;
    this.universityTodoService.setCollection('universities/uwa/todo');
    this.todos = this.universityTodoService.list();
    this.todos.subscribe(() => {
      this.isLoading = false;
    });
  }

  sortToDosByTitle() {
    this.universityTodoService.setCollection('universities/uwa/todo', ref => ref.orderBy('title'));
    this.todos = this.universityTodoService.list();
  }

  sortToDosByTime() {
    this.universityTodoService.setCollection('universities/uwa/todo', ref => ref.orderBy('created', 'desc'));
    this.todos = this.universityTodoService.list();
  }

  timestampToString(ts: number): string {
    if (!ts) { return ''; }
    const d = new Date(ts);
    return d.toLocaleString();
  }
}
