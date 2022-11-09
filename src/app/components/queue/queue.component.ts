import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {QueueService} from '../../services/queue/queue.service';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

    queueOpen: any;
    queueOpenSubscription: Subscription;

    queueComplete: any;
    queueCompleteSubscription: Subscription;
    queueFailed: any;
    queueFailedSubscription: Subscription;
    queueInProgress: any;
    queueInProgressSubscription: Subscription;
    queueScheduled: any;
    queueScheduledSubscription: Subscription;


    constructor(private queueService: QueueService) {
        this.queueOpenSubscription = this.queueService.getQueueOpen().subscribe(data => this.queueOpen = data);
        this.queueCompleteSubscription = this.queueService.getQueueComplete().subscribe(data => this.queueComplete = data);
        this.queueFailedSubscription = this.queueService.getQueueFailed().subscribe(data => this.queueFailed = data);
        this.queueInProgressSubscription = this.queueService.getQueueInProgress().subscribe(data => this.queueInProgress = data);
        this.queueScheduledSubscription = this.queueService.getQueueScheduled().subscribe(data => this.queueScheduled = data);
    }

    ngOnInit(): void {
        this.queueService.httpGetQueue('Complete', 5).subscribe(data => {
            this.queueService.setQueueComplete(data);
        });
        this.queueService.httpGetQueue('Failed', 5).subscribe(data => {
            this.queueService.setQueueFailed(data);
        });
        this.queueService.httpGetQueue('Running').subscribe(data => {
            this.queueService.setQueueInProgress(data);
        });
        this.queueService.httpGetQueue('Scheduled').subscribe(data => {
            this.queueService.setQueueScheduled(data);
        });
    }

    closeQueue() {
        this.queueService.setQueueOpen(false);
        document.body.classList.remove('app-queue-open');
    }

    viewReport(e, report): void {
        e.stopPropagation();
        window.open(report.resultUrl);
    }
}
