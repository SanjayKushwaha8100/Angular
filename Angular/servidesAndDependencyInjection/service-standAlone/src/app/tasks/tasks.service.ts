import { inject, Injectable, Input, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// 1st way 
// @Injectable({        
//   providedIn: 'root',
// })

//  above one is recomended and will create only one instance of this service in whole application
// you can also define it at main in bootstrapapplication

// 2 way -> at element lvl( element injector) see tasks.component.ts

// 3 way -> as a custom token see main.ts and all constructor and inject()
export class TasksService {
  private tasks = signal<Task[]>([]); // ([]) -> to accept a array, <Task[]>  array of type task array
  allTasks = this.tasks.asReadonly(); // to only read the tasks array outside the class through ng dependency injection

  private loggingService = inject(LoggingService);

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      // Task contains id,title,desc,status
      id: Math.random().toString(),
      ...taskData, // this will copy title and desc
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('ADDING TASK WITH TITLE:'+taskData.title);
  }
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    this.loggingService.log("CHANGING TASK STATUS TO :"+newStatus);
  }
}
