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

  constructor(private universityTodoService: UniversityTodoService) { }

  ngOnInit() {
    this.isLoading = true;
    this.universityTodoService.setCollection('universities/uwa/todo');
    this.todos = this.universityTodoService.list();
    this.todos.subscribe(() => {
      this.isLoading = false;
    });
  }

}
