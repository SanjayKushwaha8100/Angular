import { Component, EventEmitter, Input, model, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // userDefined two-way binding *** is the name eg- size and sizeChange
  @Input({required:true}) size!:{width:string,height:string};
  @Output() sizeChange = new EventEmitter<{width:string,height:string}>();

  // below is for angular 17.2 or above
  // size = model.required<{width:string,height:string}>();
  onReset() {
    this.sizeChange.emit({
      width:'20',
      height:'20'
    });
    // for signal use set() method instead of emitting 
  }
}
