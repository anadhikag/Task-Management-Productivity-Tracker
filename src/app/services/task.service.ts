import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getTasks(): Task[] {
    if (!this.isBrowser) return [];
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getTaskById(id: number): Task | undefined {
    return this.getTasks().find(t => t.id === id);
  }

  addTask(task: Task): void {
    if (!this.isBrowser) return;
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  updateTask(updated: Task): void {
    if (!this.isBrowser) return;
    const tasks = this.getTasks().map(t =>
      t.id === updated.id ? updated : t
    );
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  deleteTask(id: number): void {
  if (!this.isBrowser) return;
  const tasks = this.getTasks().filter(t => t.id !== id);
  localStorage.setItem(this.storageKey, JSON.stringify(tasks));
}

}
