import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/todo';
import { BACKEND_BASE_DOMEN } from 'src/env';

@Component({
  selector: 'app-todo-widet',
  templateUrl: './todo-widet.component.html',
  styleUrls: ['./todo-widet.component.scss']
})
export class TodoWidetComponent implements OnInit {

  public title = ''
  public todoData: Todo[]

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Todo[]>(BACKEND_BASE_DOMEN + 'todo').subscribe(result => {
      this.todoData = result
      console.log(this.todoData)
    })
  }
  ngOnInit(): void { }
  onCreate(): void {
    if (this.title) {
      this.httpClient.post<Todo>(BACKEND_BASE_DOMEN + 'todo', {
        title: this.title
      }).subscribe(result => {
        this.todoData.push(result)

      });
      this.title = ''
    }
  }
  onCompleted(todo: Todo) {
    this.httpClient.patch<Todo>(BACKEND_BASE_DOMEN + 'todo/' + todo.id, {
      isCompleted: !todo.isCompleted
    }).subscribe((updatTodo: Todo) => {
      this.todoData = this.todoData.map(todo => todo.id !== updatTodo.id ? todo : updatTodo);
    });
  }
  onRemove(id) {
    this.httpClient.delete<void>(BACKEND_BASE_DOMEN + 'todo/' + id).subscribe(() => {
      this.todoData = this.todoData.filter(todo => todo.id !== id)
    })
  }
}
