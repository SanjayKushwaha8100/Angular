import { Component, ElementRef, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  // below one is for way 1 and 2 
  // constructor(private taskService:TasksService){
  //   // it’s quite similar! like bean in springboot
  //   // The private taskService: TasksService is an example of Angular’s dependency injection. 
  //   // Here, TasksService is a service that is being injected into the class. By prefixing taskService with private, 
  //   // it means that this property is accessible within the class but not outside of it.
  // }
  // this is for way 3 only has special syntax
  constructor(@Inject(TasksServiceToken) private taskService:TasksService ){}

  onAddTask(title: string, description: string) {
    this.taskService.addTask({title,description}); // two argument is send from here other 3 u will get in addTask() method
    this.formEl()?.nativeElement.reset();
  }
}
