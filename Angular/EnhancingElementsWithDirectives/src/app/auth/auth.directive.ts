import { Directive, effect, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  @Input({ required: true , alias:'appAuth'}) userType!: Permission ;
  private authService = inject(AuthService);
  // injecting TemplateRef and ViewConainerRef to make it structural directive
  private templateRef = inject(TemplateRef);  // to get the content of ng-module tag or to get the template 
  private viewContainerRef = inject(ViewContainerRef);  // give you the access to the content of this template to view in DOM(in html) 
  constructor() {
    effect(()=>{
      if(this.authService.activePermission() === this.userType){
        this.viewContainerRef.createEmbeddedView(this.templateRef);// to render new elem in the DOM if you didn't call this method you
        // will not be able to see the content which is present between the ng-module
      }
      else{
        this.viewContainerRef.clear();
      }
    })
  }
}
