import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpClient,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap } from 'rxjs';

function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
    // below is the way to manipulate the request
    const req = request.clone({headers: request.headers.set('X-DEBUG','TESTING')});
  console.log('[Outgoing request]');
  console.log('Original:',request);
//   console.log('Modified:', req)
  return next(request)// passing the request or returning it
    .pipe(tap({
        next: event=>{
            if(event.type === HttpEventType.Response){
                console.log('[Incoming Response]');
                console.log(event.status);
                console.log(event.body);
            }
        }
    }))
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));