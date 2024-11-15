import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // GO TO app.ts
})
export class LoggingService {
  log(message : string){
    const timeStamp = new Date().toLocaleTimeString();
    console.log(`[${timeStamp}]:${message}`);
  }
}
