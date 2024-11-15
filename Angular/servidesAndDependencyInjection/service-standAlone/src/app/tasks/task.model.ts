import { Inject, InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

type TaskStatusOptions={
  value: 'open' | 'in-progress' | 'done';
  taskStatus:TaskStatus,
  text:string;
}[]

// injecting other value (not service)
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>('task-status-option')
export const TaskStatusOptions:TaskStatusOptions=[
  {
    value: 'open',
    taskStatus: 'OPEN',
    text:'Open'
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text:'In-Progress'
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text:'Completed'
  }
  
]

// define the injector is instead of tasks-list.ts to make it clean
 export const taskStatusOptionsProvider: Provider = {
   provide:TASK_STATUS_OPTIONS,
  // useFactory:()=> // for computing with complex value 
  useValue:TaskStatusOptions
}
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
