import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
// if you are using modules then  pass provideHttpClient() to  array of your root NgModule
// @NgModule({
//   declarations: [
//     AppComponent,
//     PlacesComponent,
//     // ... etc
//   ],
//   imports: [BrowserModule, FormsModule],
//   providers: [provideHttpClient()],
//   bootstrap: [AppComponent],
// })
export class AvailablePlacesComponent implements OnInit {

  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient); // injecting HttpClient through main.js or inject at rool lvl. Can impl using constructor
  private destroyRef = inject(DestroyRef);
  isFatching = signal(false);
  error = signal('');
  private placeService = inject(PlacesService);
  ngOnInit() {
    this.isFatching.set(true);
    // get() return a observable means a object which we have to subscribe to triiger the get()
    const subscribe = this.placeService.loadAvailablePlaces()
      .subscribe({
        // This method gets executed every time the observable emits a value.
        next: (currentPlaces) => {
          this.places.set(currentPlaces);
        },
        error: (error:Error) => {
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

  onSelectPlace(selectedPlace:Place) {
    // you have to subscribe to trigger a request
      const subscription = this.placeService.addPlaceToUserPlaces(selectedPlace).subscribe({
        next:(resData=>console.log(resData)),
      });

      this.destroyRef.onDestroy(()=>subscription.unsubscribe());
    }
}
