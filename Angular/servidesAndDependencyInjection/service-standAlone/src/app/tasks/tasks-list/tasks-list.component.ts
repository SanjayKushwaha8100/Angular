import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, TaskStatusOptions, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers:[taskStatusOptionsProvider] // defined in task.model.ts then using here(injecting)
})
export class TasksListComponent {
  // private taskService = inject(TasksService); // another way of dependency injection otherthen through constructor
  private taskService = inject(TasksServiceToken);
  selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS); // using the injected value
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.taskService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.taskService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.taskService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
