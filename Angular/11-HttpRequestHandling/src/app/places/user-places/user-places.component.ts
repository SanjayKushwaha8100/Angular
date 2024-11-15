import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  private httpClient = inject(HttpClient); // injecting HttpClient through main.js or inject at rool lvl. Can impl using constructor
  private destroyRef = inject(DestroyRef);
  isFatching = signal(false);
  error = signal('');
  private placeService = inject(PlacesService);
  places = this.placeService.loadedUserPlaces;
  ngOnInit() {
    this.isFatching.set(true);
    // get() return a observable means a object which we have to subscribe to trigger the get()
    const subscribe = this.placeService.loadUserPlaces().subscribe({
      // This method gets executed every time the observable emits a value.
      // next: (currentPlaces) => {
      //   this.places.set(currentPlaces);
      // },
      error: (error: Error) => {
        // return a error obj
        // console.log(error);
        this.error.set(error.message);
      },
      complete: () => {
        this.isFatching.set(false);
      },
    });

    // unsubscribing
    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }
  onRemovePlaces(place:Place) { 
    const subscribe = this.placeService.removeUserPlace(place).subscribe();
    this.destroyRef.onDestroy(()=>{
      subscribe.unsubscribe();
    })
    
  }
}
