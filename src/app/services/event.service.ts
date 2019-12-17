import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  subject: Subject<Event> = new Subject<Event>();

  notifyObservable: Observable<Event> = this.subject.asObservable();

  constructor() { }

  notify(event: Event): void {
    if (event) {
      this.subject.next(event);
    }
  }
}
