import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Todo } from '../models/todo'
import { BACKEND_BASE_DOMEN } from 'src/env';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public entities$: BehaviorSubject<Todo[]> = new BehaviorSubject([])
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private todoData: Todo[] = []
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    this.loading$.next(true)
    this.httpClient.get<Todo[]>(BACKEND_BASE_DOMEN + 'todo').subscribe(result => {
      this.todoData = result;
      this.entities$.next(this.todoData)
      this.loading$.next(false)

    })
  }

  public add(title) {
    this.loading$.next(true)
    this.httpClient.post<Todo>(BACKEND_BASE_DOMEN + 'todo', { title }).subscribe(result => {
      this.todoData.push(result);
      this.entities$.next(this.todoData)
      this.loading$.next(false)

    });
  }

  public update(todo: Todo) {
    this.loading$.next(true)

    this.httpClient.patch<Todo>(BACKEND_BASE_DOMEN + 'todo/' + todo.id, {
      isCompleted: !todo.isCompleted
    }).subscribe((updatTodo: Todo) => {
      this.todoData = this.todoData.map(todo => todo.id !== updatTodo.id ? todo : updatTodo);
      this.entities$.next(this.todoData)
      this.loading$.next(false)

    });
  }

  public remove(id: number) {
    this.loading$.next(true)

    this.httpClient.delete<void>(BACKEND_BASE_DOMEN + 'todo/' + id).subscribe(() => {
      this.todoData = this.todoData.filter(todo => todo.id !== id);
      this.entities$.next(this.todoData)
      this.loading$.next(false)

    })
  }
}
