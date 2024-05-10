import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QueueService {

    private queueOpen = new BehaviorSubject(false);
    private queueComplete = new Subject();
    private queueFailed = new Subject();
    private queueInProgress = new Subject();
    private queueScheduled = new Subject();
    private queueLength = new Subject();

    constructor(private http: HttpClient) {
    }

    // BRANCH
    setQueueOpen(bool) {
        this.queueOpen.next(bool);
    }

    getQueueOpen() {
        return this.queueOpen.asObservable();
    }

    setQueueComplete(queue) {
        this.queueComplete.next(queue);
    }

    getQueueComplete() {
        return this.queueComplete.asObservable();
    }

    setQueueFailed(queue) {
        this.queueFailed.next(queue);
    }

    getQueueFailed() {
        return this.queueFailed.asObservable();
    }

    setQueueInProgress(queue) {
        this.queueInProgress.next(queue);
    }

    getQueueInProgress() {
        return this.queueInProgress.asObservable();
    }

    setQueueScheduled(queue) {
        this.queueScheduled.next(queue);
    }

    getQueueScheduled() {
        return this.queueScheduled.asObservable();
    }

    setQueueLength(queueLength) {
        this.queueLength.next(queueLength);
    }

    getQueueLength() {
        return this.queueLength.asObservable();
    }

    httpGetQueue(statusFilter, time?) {
        return this.http.get('/schedule-manager/jobs/runs?page=0&size=100&statusFilter=' + statusFilter + (time ? '&sinceMins=' + time : ''));
    }

    httpGetQueueLength() {
        return this.http.get<Object[]>('/schedule-manager/jobs/runs?page=0&size=100&statusFilter=Running&statusFilter=Scheduled');
    }
}
