import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
@Input({required:true}) userId!:string;
@Output() close = new EventEmitter(); // type is void ->   <void>

  enteredTitle= '';
  enteredSummary = '';  
  // or
  // enteredSummary = signal('');  
  enteredDate = '';

  private tasksService = inject(TasksService) // same like dependency injection using constructor
  onCancel() {
    this.close.emit(); // passing the value from child to parent 
  }

  onSubmit() {
      this.tasksService.addTask({
        title:this.enteredTitle,
        summary:this.enteredSummary,
        date:this.enteredDate
      },
        this.userId
      );
      this.close.emit();
    }

}
