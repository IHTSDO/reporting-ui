import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  event: Subject<any> = new Subject<any>();

  notifyObservable: Observable<any> = this.event.asObservable();

  constructor() { }

  notify(data: any): void {
    if (data) {
      this.event.next(data);
    }
  }
}
