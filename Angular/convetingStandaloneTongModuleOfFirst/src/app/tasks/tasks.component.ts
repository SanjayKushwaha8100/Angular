import { Component, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import {type NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {






  // @Input({required:true}) name!:string;  // it will be initilize 
  //  OR  
  // @Input({required:true}) name : string | undefined; // if not initzi then undefined
  // OR  
  @Input({required:true}) name?:string;   // ? is like I know it might not be initilize means undefine
  @Input({required:true}) Userid!:string;
  isAddingTask = false;
  // private tasksService : TasksService; // we have create it in constructor only 

  // dependency injection 
  constructor(private tasksService:TasksService){
    this.tasksService = tasksService; // storing it locally 
  }
  

  get SelectedUserTasks(){
    return this.tasksService.getUserTasks(this.Userid);
  }

  onStartAddTask() {
    this.isAddingTask=true;
  }

  oncloseAddTask(){
    this.isAddingTask=false;
  }

    

}
