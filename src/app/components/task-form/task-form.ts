import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
})
export class TaskForm {
  title = '';
  description = '';
  category = '';
  progress = 0;

  constructor(private taskService: TaskService, private router: Router) {}

  submit() {
    if (!this.title) return;

    this.taskService.addTask({
      id: Date.now(),
      title: this.title,
      description: this.description,
      category: this.category,
      progress: this.progress,
      completed: this.progress === 100
    });

    this.router.navigate(['/']);
  }
}
