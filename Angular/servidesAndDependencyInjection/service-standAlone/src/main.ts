import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

// for 1 way
// bootstrapApplication(AppComponent).catch((err) => console.error(err));

// below code is for injecting the TasksService at root lvl

// bootstrapApplication(AppComponent,{
//     providers:[TasksService]
// }).catch((err) => console.error(err));

// {
//     providers:[TasksService]
// }
// injecting in root enviroment injector instead of in tasks.service.ts
// and anything in that array when ng build the app at that time only it will load it weither it is need or not at that point of time

//3rd way -> below code is for injecting by using our custom token.

export const TasksServiceToken = new InjectionToken<TasksService>('tasks-service-token');
 
bootstrapApplication(AppComponent, {
  providers: [{ provide: TasksServiceToken, useClass: TasksService }],
}).catch((err) => console.error(err));
