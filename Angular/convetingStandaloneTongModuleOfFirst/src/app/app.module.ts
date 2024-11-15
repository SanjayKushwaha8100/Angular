import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../header/header.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './shared/card/shared.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  //declarations are for non standalone components and imports for standalone components and it can imports other modules also
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule,SharedModule,TasksModule],
})
export class AppModule {
    // all the module whihc is in imports array will not talks to eachother but will be avilable to all declarations array 
    // components so if any depencency is there with each other in the import array module then go to that module 
    // and imports that Module in the import array 
    
    // BroserModule is a special module which you can import in the main module if you want to use its component in
    // any other Module use CommonModule 
}
