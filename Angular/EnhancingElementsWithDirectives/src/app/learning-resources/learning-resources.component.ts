import { Component } from '@angular/core';
import { SafeLinkDirective } from '../safe-link.directive';
import { LogDirective } from '../log.directive';
@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports:[SafeLinkDirective,LogDirective],
  // hostDirectives:[LogDirective] 
  // LogDirective would be a specific directive that performs some logging functionality 
   // when the host component is used. This could involve logging events, state changes, or lifecycle events related to that component.
})
export class LearningResourcesComponent {

}
