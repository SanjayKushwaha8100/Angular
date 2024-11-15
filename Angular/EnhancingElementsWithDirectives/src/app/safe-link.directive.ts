import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]', // adding a is for appling this to the anchor tag
  standalone: true,
  host: {
    '(click)': 'onConfirmPageLeave($event)',
  },
  //   In Angular, the host property allows you to define event listeners and properties directly on the host element
  //    (in this case, the anchor tag). This means you can bind methods or properties to the element without needing to
  //    modify its template, enabling you to handle events like click directly within the directive
})
export class SafeLinkDirective {
  constructor() {
    console.log('SafeLinkDirective is printed');
  }
  @Input() queryParameter!: string;
//   @Input() queryParameter!: "myapp";
  // below is another way of initilazation
//   ngOnInit() {
//     // Set default value if queryParameter is not provided
//     if (!this.queryParameter) {
//       this.queryParameter = 'myapp'; // Default value
//     }
//   }
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);   // use chatgpt to understand this line

  onConfirmPageLeave(event: MouseEvent) {
    const wantToLeave = window.confirm('Do you want to leave the app?');
    // const address = (event.target as HTMLAnchorElement).href;
    const address = this.hostElementRef.nativeElement.href;
    (event.target as HTMLAnchorElement).href = address + '?from=' +this.queryParameter;
    if (wantToLeave) {
      return;
    }
    event?.preventDefault();
  }
}
