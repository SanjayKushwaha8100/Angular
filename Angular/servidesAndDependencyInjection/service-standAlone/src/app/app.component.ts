import { Component, inject } from '@angular/core';

import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TasksComponent],
  // providers:[LoggingService]
  // *********************************************** IMPORTANT************************************
  //Above line will give a null injector error. Because as Components and Directives do reach out to this ElementInjector,
  // which is the injector to which you register the service when using this provider's array here in the component decorator.
  // But services will not reach out to the ElementInjector because they aren't elements, they're not part of the dom. 
  // They only have access to the EnvironmentInjector or the ModuleInjector.
})
export class AppComponent {
  // private tasksService = inject(TasksService);
  // if you inject TasksService at element lvl and try to use above line of code without app will crash 
  // with Error : "NullInjectorError: No provider for TasksService!"
  // and In DOM(html) if you use more than 1 <app-tasks /> then both injected service are indepedent

}
